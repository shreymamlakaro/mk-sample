
import Link from 'next/link';
 import CallToAction from '@/components/Home/CallToAction';
import RecentPosts from '@/components/Home/RecentPosts';
 import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeatureSection';
import FaqSection from '@/components/Home/FaqSection';
import { Suspense } from 'react';

export default function Home() {
//  Delay RecentPosts until API response is ready
  const RecentPostsWithFallback = (
    <Suspense
      fallback={
        <div className="text-center text-gray-500 py-6">
          Loading recent posts...
        </div>
      }
    >
      <RecentPosts limit={9} />
    </Suspense>
  );

  return (
    <div className="bg-gray-50 text-blue-700">
      {/* Hero Section (Always visible immediately) */}
      <HeroSection />

      {/* Features Section (Static content loads immediately) */}
      <FeaturesSection />

      {/* Call to Action (Static content loads immediately) */}
      <div className="bg-gray-50 text-blue-700">
        <CallToAction />
      </div>

      {/* Conditional Rendering for Recent Posts (Async API fetch with suspense) */}
      <div className="p-3 flex flex-col gap-8 py-7 w-full max-w-6xl mx-auto">
        {RecentPostsWithFallback}
        <Link
          href={'/search?category=null'}
          className="text-lg bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center mx-auto"
        >
          View all posts
        </Link>
      </div>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
