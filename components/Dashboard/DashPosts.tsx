'use client';

import { Button, Modal, Table, Spinner, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export default function DashPosts({ userId }: { userId: string }) {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;

      try {
        const { data, error } = await supabase.from('posts').select('*').eq('user_id', userId);
        if (error) {
          console.error('Error fetching posts:', error.message);
        } else {
          setUserPosts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postIdToDelete);
      if (error) {
        console.error('Error deleting post:', error.message);
      } else {
        setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== postIdToDelete));
        setPostIdToDelete('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full py-7">
        <h1 className="text-2xl font-semibold">You are not logged in!</h1>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Your Posts</h1>

      {userPosts.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date Updated</th>
                <th scope="col" className="px-6 py-3">Post Image</th>
                <th scope="col" className="px-6 py-3">Post Title</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    {new Date(post.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <a href={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover rounded-md"
                      />
                    </a>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    <a href={`/post/${post.slug}`}>{post.title}</a>
                  </td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <Button
                    className="text-red-400"
                      color="failure"
                      size="xs"
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Link href={`/dashboard/update-post/${post.id}`}>
                      <Button color="info" size="xs"
                      className="text-green-400">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4" />
          <p className="text-lg text-gray-500 dark:text-gray-400">You have no posts yet!</p>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
