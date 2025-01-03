'use client';

import {
  UserCircle,
  ArrowRightCircle,
  FileText,
  Users,
  PieChart,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function DashSidebar({ isAdmin }: { isAdmin: boolean }) {
  const [tab, setTab] = useState('');
  const searchParams = useSearchParams();
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

   // Replace with actual admin check logic

  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard?tab=dash',
      icon: PieChart,
      visible: isAdmin,
    },
    {
      title: 'Profile',
      url: '/dashboard?tab=profile',
      icon: UserCircle,
      label: isAdmin ? 'Admin' : 'User',
    },
    {
      title: 'Posts',
      url: '/dashboard?tab=posts',
      icon: FileText,
    },
    {
      title: 'Users',
      url: '/dashboard?tab=users',
      icon: Users,
      visible: isAdmin,
    },
  ];

  return (
    <div className="w-full md:w-56 border border-gray-300 text-black  h-full
    ">
     
      <nav className="flex flex-col space-y-1 p-4">
        {items.map(
          (item) =>
            (item.visible === undefined || item.visible) && (
              <Link
              prefetch={true}
                key={item.title}
                href={item.url}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  tab === item.url.split('tab=')[1] ? 'bg-gray-100' : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
                {item?.label && <span className="ml-auto text-sm">{item.label}</span>}
              </Link>
            )
        )}
        <button
          onClick={() => console.log('Sign Out')}
          className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100"
        >
          <ArrowRightCircle className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
