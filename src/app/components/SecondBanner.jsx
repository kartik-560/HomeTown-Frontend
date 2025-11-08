"use client";

import React from "react";
import Link from "next/link";

export default function SecondBanner() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Background Image */}
        <img
          src="/images/gii22.png"
          alt="Hero Banner"
          className="w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-8 md:pl-12">
          <div className="text-[#5A4E3C] max-w-sm sm:max-w-md md:max-w-lg bg-white/70 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight 
              bg-gradient-to-r from-[#A0937D] via-[#5A4E3C] to-[#F6E6CB] 
              bg-clip-text text-transparent drop-shadow">
              Bring Softness to Your Setup
            </h1>
            <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-[#5A4E3C] font-medium">
              From storage to seating, seamlessly create a living space that
              feels warm, cozy, and timeless.
            </p>
            <Link href="#shop-by-category" className="mt-4 sm:mt-6 inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#A0937D] text-white rounded-full shadow-md hover:bg-[#8a826b] transition font-medium text-sm sm:text-base">
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}