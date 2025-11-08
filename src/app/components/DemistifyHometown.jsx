"use client";

import { Sofa, Utensils, BedDouble, Briefcase } from "lucide-react";

export default function DemistifyHometown() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 text-[#5c5140] relative">
      {/* 🌟 Title */}
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#A0937D] to-[#d1c7b6] bg-clip-text text-transparent leading-snug sm:leading-tight mb-6 sm:mb-8 text-center">
        Discover Furniture & Home Décor That Transforms Your Space
      </h2>

      {/* ✨ Intro */}
      <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-12 sm:mb-16 text-gray-700 px-2 sm:px-0">
        <p>
          Curated collections designed for{" "}
          <span className="font-semibold">style, comfort, and functionality</span> — whether your vibe is modern minimalism or timeless elegance.
        </p>
        <p>
          Every piece combines <span className="italic">authentic craftsmanship</span> with contemporary design, ensuring your home feels warm, stylish, and welcoming.
        </p>
        <p>
          Elevate everyday living with furniture that blends durability and sophistication.
        </p>
      </div>

      {/* 🌟 Section Heading */}
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#5c5140] mb-10 sm:mb-14 tracking-tight">
        Explore Our Exclusive Categories
      </h3>

      {/* 🪑 Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Living Room */}
        <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#fdfbf8] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="p-3 sm:p-4 bg-[#f1eee9] rounded-xl flex-shrink-0">
            <Sofa className="w-8 h-8 sm:w-10 sm:h-10 text-[#A0937D]" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl font-semibold text-[#5c5140] mb-1 sm:mb-2">
              Living Room – Sofas, Coffee Tables & TV Units
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              A balance of comfort & design — make your living room the heart of gatherings.
            </p>
          </div>
        </div>

        {/* Dining */}
        <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#fdfbf8] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="p-3 sm:p-4 bg-[#f1eee9] rounded-xl flex-shrink-0">
            <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-[#A0937D]" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl font-semibold text-[#5c5140] mb-1 sm:mb-2">
              Dining Spaces – Tables, Chairs & Storage
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              From cozy dinners to grand feasts — create dining spaces full of warmth.
            </p>
          </div>
        </div>

        {/* Bedroom */}
        <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#fdfbf8] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="p-3 sm:p-4 bg-[#f1eee9] rounded-xl flex-shrink-0">
            <BedDouble className="w-8 h-8 sm:w-10 sm:h-10 text-[#A0937D]" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl font-semibold text-[#5c5140] mb-1 sm:mb-2">
              Bedroom Comfort – Beds, Wardrobes & Side Tables
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              Turn your bedroom into a serene sanctuary with cozy & smart storage solutions.
            </p>
          </div>
        </div>

        {/* Workspaces */}
        <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#fdfbf8] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="p-3 sm:p-4 bg-[#f1eee9] rounded-xl flex-shrink-0">
            <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-[#A0937D]" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl font-semibold text-[#5c5140] mb-1 sm:mb-2">
              Workspaces – Desks, Chairs & Shelves
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              Boost productivity with ergonomic designs that merge focus with elegance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}