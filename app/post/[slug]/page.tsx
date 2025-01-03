'use client'
import { useEffect, useState } from 'react';
import CallToAction from '@/components/Home/CallToAction';
import RecentPosts from '@/components/Home/RecentPosts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

// Initialize Supabase client

const supabase = createClient();

interface Post {
  title: string;
  slug: string;
  image: string;
  category: string;
  createdAt: string;
  content: string;
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts') // Replace 'posts' with your table name
          .select('*')
          .eq('slug', params.slug)
          .single();

        if (error) throw error;
        setPost(data as Post);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-blue-900">
        <p className="text-lg font-semibold">Loading post...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-blue-900">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <p className="text-sm mt-2">{error || 'The requested post could not be found. Please try again later.'}</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white text-blue-900 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mt-4">{post.title}</h1>
      <div className="flex justify-center mt-4">
        <Link href={`/search?category=${post.category}`}>
          <Button color="blue" pill size="xs">
            {post.category}
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <img
          src={post.image}
          alt={post.title}
          width={800}
          height={450}
          className="rounded-lg mx-auto max-h-[500px] w-full object-cover"
        />
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{(post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div
        className="prose mt-6 text-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="mt-10">
        <CallToAction />
      </div>
      <div className="mt-10">
        <RecentPosts limit={3} />
      </div>
    </main>
  );
}
