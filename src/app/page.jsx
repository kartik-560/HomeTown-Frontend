"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import Newarrival from "./components/Narrival";
import Category from "./components/Category";
import A from "./components/A";
import ProductCard from "./components/ProductCard";
import SecondBanner from "./components/SecondBanner";
import StealDeal from "./components/StealDeal";
import DemistifyHometown from "./components/DemistifyHometown";

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <main className="space-y-16">
        {/* ✅ Hero Banner Section with Navbar on top */}
        <section className="relative w-full h-screen overflow-hidden">
          <video
            src="/video (4).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Black transparent overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-20"></div>
          {/* ✅ Overlay TEXT and Button */}
          <div className="absolute z-30 left-0 top-0 w-full h-full flex items-center">
            <div className="ml-16 max-w-xl">
              <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-4">STEAL DEAL</h1>
              <p className="text-2xl text-white font-semibold mb-6 drop-shadow-md">
                LIMITED TIME DEALS, UNLIMITED SAVINGS
              </p>
              <div className="mb-6">
                <span className="bg-[#757545] text-white text-lg font-bold px-6 py-2 rounded-md inline-block tracking-wider">
                  MIN. 40% OFF
                </span>
              </div>
              <Link
                href="#shop-by-category"
                className="inline-block text-xl font-bold px-8 py-3 rounded-md shadow transition"
                style={{
                  backgroundColor: "#A0937D",
                  color: "#fff",
                  border: "none"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = "#E7D4B5";
                  e.currentTarget.style.color = "#A0937D";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = "#A0937D";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                SHOP NOW
              </Link>
            </div>
          </div>
          {/* ✅ Navbar overlay */}
          <div className="absolute top-0 left-0 w-full z-40">
            <Navbar />
          </div>
        </section>
        {/* ✅ Arrival*/}
        <Newarrival />
        {/* ✅ Popular Categories Section */}
        <Category />
        {/* Animation */}
        <A />
        {/* ✅ Product Cards Section */}
        <ProductCard />
        {/* ✅ banner2 */}
        <SecondBanner />
        {/* ✅ Steal Deal Section */}
        <StealDeal />
      </main>
      {/* Description of project */}
      <DemistifyHometown />
      {/* ✅ Footer */}
    </div>
  );
}
