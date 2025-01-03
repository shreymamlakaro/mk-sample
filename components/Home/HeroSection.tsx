/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-700 rounded-lg px-6 md:px-10 lg:px-20">
      {/* --------- Header Left --------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-[10vw]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-snug">
          Simplify Legal Solutions <br /> with Technology
        </h1>
        <p className="text-white text-sm md:text-base lg:text-lg font-light">
          Access affordable, efficient, and quality legal services in one
          platform. <br className="hidden sm:block" />
          Join MamlaKaro&apos;s Beta to experience a seamless legal journey.
        </p>
        <Link href="/sign-in">
          <span className="flex items-center gap-3 bg-white text-blue-700 px-6 py-3 font-semibold text-sm hover:bg-gray-200 transition-all duration-300 shadow-lg">
            Join Beta Waitlist Now
          </span>
        </Link>
      </div>

      {/* --------- Header Right --------- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full rounded-lg md:absolute md:bottom-0 md:right-0 md:w-[90%] lg:w-[80%] h-auto shadow-lg"
          src="/assets/header_img.png"
          alt="Legal Tech Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
