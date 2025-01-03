'use client'
import React from "react";
import Sidebar from "@/components/Profile/Sidebar";
import ProfileCard from "@/components/Profile/ProfileHeader";
import ProfileForm from "@/components/Profile/ProfileForm";
export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 w-full justify-center">
      {/* Sidebar */}
      {/* Profile Content */}
      <main className="flex-1 p-10 bg-white">
        {/* User Header */}
        <ProfileCard />

        {/* Profile Form */}
        <ProfileForm />
      </main>
    </div>
  );
}