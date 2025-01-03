"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "./ui/button"; // ShadCN button
import { cn } from "./../lib/utils";
import LogoutButton from './../app/dashboard/LogoutButton';

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set("searchTerm", searchTerm);
    router.push(`/search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [searchParams]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-white shadow-sm">
    {/* Top Section */}
    <div className="container mx-auto flex items-center justify-between py-4 px-4">
      {/* Branding */}
      <Link href="/"  prefetch={true} className="flex items-center space-x-2 group">
        <span className="px-3 py-1 bg-blue-700 text-white rounded-full font-bold transition-all duration-200 transform group-hover:scale-105">
          MAMLA
        </span>
        <span className="font-semibold text-blue-700 text-lg tracking-wide group-hover:text-blue-500">
          KARO<sup>®</sup>
        </span>
      </Link>
  
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex items-center justify-center w-2/5"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
          >
            <AiOutlineSearch size={22} />
          </button>
        </div>
      </form>
  
      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* <Link href="/login" prefetch={true}>
          <Button
            variant="outline"
            className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200"
          >
            Sign In
          </Button>
        </Link> */}
        <LogoutButton/>
      </div>
    </div>
  
    {/* Navigation Links */}
    <nav className="bg-gray-50 shadow-sm">
      <ul className="container mx-auto flex justify-center gap-8 py-2">
        {[
          { name: "Home", href: "/" },
          { name: "Dashboard", href: "/dashboard" },
          { name: "About", href: "/about" },
          { name: "Contact Us", href: "/contact" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={true}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-blue-700 hover:text-white",
                path === link.href ? "bg-blue-700 text-white" : "text-blue-700"
              )}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
  
  );
}
