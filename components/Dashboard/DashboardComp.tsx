'use client';
import { useEffect, useState } from 'react';
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

type User = {
  id: string;
  created_at: string;
  profile_completed: boolean;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  username: string;
  email: string;
  is_admin: boolean;
  updated_at: string;
};

interface Post {
  id: string;
  title: string;
  category: string;
  image?: string;
}

export default function DashboardComp({ isAdmin }: { isAdmin: boolean }) {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [lastMonthUsers, setLastMonthUsers] = useState<number>(0);
  const [lastMonthPosts, setLastMonthPosts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const lastMonthStart = new Date();
      lastMonthStart.setUTCMonth(lastMonthStart.getUTCMonth() - 1, 1);
      lastMonthStart.setUTCHours(0, 0, 0, 0);

      const lastMonthEnd = new Date(lastMonthStart);
      lastMonthEnd.setUTCMonth(lastMonthStart.getUTCMonth() + 1, 0);
      lastMonthEnd.setUTCHours(23, 59, 59, 999);

      const startDate = lastMonthStart.toISOString();
      const endDate = lastMonthEnd.toISOString();

      try {
        if (isAdmin) {
          setLoading(true);

          const { count: totalUsers, error: totalUsersError } = await supabase
            .from("users")
            .select("*", { count: "exact", head: true });

          if (!totalUsersError) setTotalUsers(totalUsers || 0);

          const { count: totalPosts, error: totalPostsError } = await supabase
            .from("posts")
            .select("*", { count: "exact", head: true });

          if (!totalPostsError) setTotalPosts(totalPosts || 0);

          const { count: lastMonthUser, error: lastMonthUsersError } = await supabase
            .from("users")
            .select("*", { count: "exact", head: true })
            .gte("created_at", startDate)
            .lte("created_at", endDate);

          if (!lastMonthUsersError) setLastMonthUsers(lastMonthUser || 0);

          const { count: lastMonthPost, error: lastMonthPostsError } = await supabase
            .from("posts")
            .select("*", { count: "exact", head: true })
            .gte("created_at", startDate)
            .lte("created_at", endDate);

          if (!lastMonthPostsError) setLastMonthPosts(lastMonthPost || 0);

          const { data: recentUsers, error: recentUsersError } = await supabase
            .from("users")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5);

          if (!recentUsersError) setUsers(recentUsers || []);

          const { data: recentPosts, error: recentPostsError } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5);

          if (!recentPostsError) setPosts(recentPosts || []);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchSessionAndData();
  }, [isAdmin]);

  if (!isAdmin) return <p>You do not have access to this dashboard.</p>;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 md:mx-auto mt-12">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col p-4 dark:bg-slate-800 bg-white gap-4 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Users</h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3" />
          </div>
          <div className="text-sm flex gap-2 items-center">
            <HiArrowNarrowUp className="text-green-500" />
            <span className="text-green-500">{lastMonthUsers} Last Month</span>
          </div>
        </div>

        <div className="flex flex-col p-4 dark:bg-slate-800 bg-white gap-4 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Posts</h3>
              <p className="text-2xl font-bold">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3" />
          </div>
          <div className="text-sm flex gap-2 items-center">
            <HiArrowNarrowUp className="text-green-500" />
            <span className="text-green-500">{lastMonthPosts} Last Month</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Users</h3>
            <Link href="/dashboard?tab=users" className="text-blue-500 hover:underline">See All</Link>
          </div>
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2">User Image</th>
                <th className="px-4 py-2">Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={user.profile_picture || '/default-avatar.png'}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden">
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Posts</h3>
            <Link href="/dashboard?tab=posts" className="text-blue-500 hover:underline">See All</Link>
          </div>
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-2">Post Image</th>
                <th className="px-4 py-2">Post Title</th>
                <th className="px-4 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-t">
                  <td className="px-4 py-2">
                    <img
                      src={post.image || '/default-image.png'}
                      alt="post"
                      className="w-14 h-10 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{post.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
