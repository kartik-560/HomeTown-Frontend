"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  { id: 1, img: "/images/40 image.webp" },
  { id: 2, img: "/images/pa14.jpg" },
  { id: 3, img: "/images/pa17.jpg" },
  { id: 4, img: "/images/pa15.jpg" },
  { id: 5, img: "/images/pa12.jpg" },
  { id: 6, img: "/images/pa16.jpg" },
];

// ✅ Custom hook to track screen size (client only)
function useScreenSize() {
  // No TypeScript angle brackets!
  const [screen, setScreen] = useState("desktop");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) setScreen("mobile");
      else if (window.innerWidth < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return screen;
}

export default function StealDeal() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false); // Prevent SSR errors
  const screen = useScreenSize();

  // Only render on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto rotate carousel
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null; // Don't render during SSR

  // Defensive mapping
  const validImages = Array.isArray(images) ? images : [];

  return (
    <section className="relative w-full flex justify-center px-4 sm:px-6 md:px-10 py-10">
      {/* Curved Container */}
      <div className="relative w-[95%] max-w-7xl mx-auto min-h-[80vh] flex flex-col md:flex-row items-center overflow-hidden 
        bg-gradient-to-r from-[#F6E6CB] to-[#E7D4B5] 
        rounded-[4rem] shadow-2xl px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Left Side Text */}
        <div className="relative flex flex-col justify-center w-full md:w-1/2 min-h-[400px] md:min-h-[500px] z-20 text-left py-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight 
            bg-gradient-to-r from-[#8A6E46] via-[#D4B98F] to-[#F6E6CB] 
            bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
            Steal Deal
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-[#5A4E3C] tracking-wide mb-4 sm:mb-6">
            Living • Bedroom • Kitchen • Décor
          </p>
          <p className="text-sm sm:text-base md:text-lg text-[#5A4E3C] mb-6 max-w-lg">
            Discover timeless furniture and décor — <br /> curated to make your home warm & inviting.
          </p>
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#A0937D] text-white rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-[#8a826b] transition w-fit">
            Shop Now
          </button>
        </div>
        {/* 3D Carousel */}
        <div className="relative flex-1 h-[380px] sm:h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden mt-8 md:mt-0">
          <div className="relative w-full flex items-center justify-center perspective-[1200px]">
            {validImages.map((img, idx) => {
              const offset = (idx - activeIdx + validImages.length) % validImages.length;
              let x = 0, z = 0, scale = 1, opacity = 1, rotateY = 0, width = 180, height = 220;

              const isMobile = screen === "mobile";
              const isTablet = screen === "tablet";

              if (offset === 0) {
                z = isMobile ? 200 : isTablet ? 280 : 350;
                scale = 1.15;
                width = isMobile ? 160 : isTablet ? 200 : 240;
                height = isMobile ? 200 : isTablet ? 260 : 300;
              } else if (offset === 1 || offset === validImages.length - 1) {
                x =
                  offset === 1
                    ? isMobile
                      ? 160
                      : isTablet
                      ? 200
                      : 260
                    : isMobile
                    ? -160
                    : isTablet
                    ? -200
                    : -260;
                z = isMobile ? 80 : isTablet ? 100 : 120;
                opacity = 0.9;
                rotateY = offset === 1 ? -15 : 15;
                width = isMobile ? 130 : isTablet ? 170 : 200;
                height = isMobile ? 160 : isTablet ? 210 : 250;
              } else {
                x =
                  offset === 2
                    ? isMobile
                      ? 260
                      : isTablet
                      ? 340
                      : 440
                    : isMobile
                    ? -260
                    : isTablet
                    ? -340
                    : -440;
                z = isMobile ? -120 : isTablet ? -160 : -200;
                scale = 0.8;
                opacity = 0.3;
                rotateY = offset === 2 ? -25 : 25;
                width = isMobile ? 100 : isTablet ? 140 : 160;
                height = isMobile ? 130 : isTablet ? 180 : 200;
              }

              return (
                <div
                  key={img.id}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translateX(${x}px) translateZ(${z}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex: z,
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: "1rem",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow:
                      offset === 0
                        ? "0 10px 35px rgba(160,147,125,0.4)"
                        : "0 5px 20px rgba(160,147,125,0.2)",
                  }}
                >
                  <Image
                    src={img.img}
                    alt={`Deal ${img.id}`}
                    width={width}
                    height={height}
                    className="object-cover w-full h-full rounded-xl"
                    priority={offset === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}