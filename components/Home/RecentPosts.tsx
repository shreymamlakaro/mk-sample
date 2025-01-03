"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { FaSpinner } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";


const supabase = createClient();

interface Post {
  id: string; // Changed from _id to id for Supabase
  slug: string;
  image: string;
  title: string;
  category: string;
}

interface RecentPostsProps {
  limit: number;
}

export default function RecentPosts({ limit }: RecentPostsProps) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts") // Replace "posts" with the name of your table
          .select("id, slug, image, title, category")
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return (
    <div className="bg-gray-100 py-10 px-6 sm:px-10 rounded-lg shadow-lg">
      {/* Section Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
        Recent Articles
      </h1>

      {/* Loader or Posts */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <FaSpinner className="animate-spin text-blue-700 text-4xl" />
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">
          No articles found. Check back later!
        </p>
      )}
    </div>
  );
}
