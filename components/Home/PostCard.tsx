/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

// Define the type for the `post` prop
interface Post {
  _id:string;
  slug: string;
  image: string;
  title: string;
  category: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="group relative w-full border border-gray-300 hover:shadow-lg h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all bg-white
    max-w-sm   shadow-md  duration-300">
      {/* Post Image */}
      <Link href={`/post/${post.slug}`} className="block">
        <img
          src={post.image}
          alt={post.title}
          className="h-[260px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Post Content */}
      <div className="p-4 flex flex-col gap-3">
        <Link href={`/post/${post.slug}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-teal-500 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <span className="text-sm text-gray-600 italic">{post.category}</span>
      </div>

      {/* Hover Effect: Read More Button */}
      <Link
        href={`/post/${post.slug}`}
        className="absolute bottom-[-200px] left-0 right-0 bg-teal-500 text-white text-center py-2 transition-all duration-300 group-hover:bottom-0"
      >
        Read Article
      </Link>
    </div>
  );
}
