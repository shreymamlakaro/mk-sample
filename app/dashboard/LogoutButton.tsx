"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client"; // Adjust path if needed
import { useRouter } from "next/navigation"; 


const supabase = createClient();

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // Fetch the current user session on mount
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Clean up subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    router.push("/login")
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    router.push("/login")
  };

  return (
    <>
      {!user ? (
        <>
          <Button className="bg-blue-700 " onClick={handleLogin}>
            Login
          </Button>
        </>
      ) : (
        <Button className="bg-blue-700" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </>
  );
}
