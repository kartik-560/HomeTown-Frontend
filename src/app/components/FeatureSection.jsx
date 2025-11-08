"use client";

import Image from "next/image";

export default function FeatureSection() {
  return (
    <section className="space-y-12 sm:space-y-16 my-8 sm:my-12">

      {/* 🌟 Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center bg-black">
        <Image
          src="/images/herobanner image.webp"
          alt="New Collection Banner"
          width={1920}
          height={800}
          className="object-cover w-full h-[250px] sm:h-[400px] lg:h-[600px]"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16">
          <h2 className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug max-w-3xl">
            Browse through our newest selection crafted with precision and style
          </h2>
          <a
            href="#"
            className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg"
          >
            Explore Now →
          </a>
        </div>
      </div>

      {/* 🌟 Decor Section */}
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 bg-white py-8 sm:py-12 px-4 sm:px-8">
        {/* 🖼 Image Side */}
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/images/47b image.webp"
            alt="Decor"
            width={500}
            height={350}
            className="rounded-xl shadow-lg w-[80%] sm:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        {/* ✨ Text Side */}
        <div className="max-w-lg text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
            Add warmth to your space{" "}
            <span className="italic font-medium text-gray-700">with our Decor</span>
          </h3>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            From walls to windows, explore our collection of decor, furnishings & more
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all"
          >
            Shop Decor →
          </a>
        </div>
      </div>

      {/* 🌟 Discount Section */}
      <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
        {/* ✅ Background Image */}
        <Image
          src="/images/living-room.jpg"
          alt="Discount Banner"
          fill
          className="object-cover"
          priority
        />

        {/* ✅ Overlay Content */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Get Extra 5% OFF upto ₹500 <br className="hidden sm:block" /> on your first purchase
          </h2>
          <a
            href="#"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-lg font-semibold text-base sm:text-lg"
          >
            WELCOME
          </a>
        </div>
      </div>

    </section>
  );
}