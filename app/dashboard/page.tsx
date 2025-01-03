'use client'
import { useEffect, useState } from 'react';
import DashSidebar from '@/components/Dashboard/DashSidebar';
import DashProfile from '@/components/Dashboard/DashProfile';
import { useSearchParams } from 'next/navigation';
import DashPosts from '@/components/Dashboard/DashPosts';
import DashUsers from '@/components/Dashboard/DashUsers';
import DashboardComp from '@/components/Dashboard/DashboardComp';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();
const Dashboard = () => {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(searchParams.toString());
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users").select("*")
        .eq("email", user.user.email)
        .single();
       
      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        return;
      }

      setIsAdmin(profile?.is_admin || false);
     
      setUserId(profile?.id)
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar isAdmin={isAdmin}/>
      </div>

      {/* Conditional Rendering based on `tab` state */}
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts userId={userId}/>}
      {tab === 'users' && <DashUsers isAdmin={isAdmin} />}
      {tab === 'dash' && <DashboardComp isAdmin={isAdmin}/>}
    </div>
  );
};

export default Dashboard;
