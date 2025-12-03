"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SECTION_BG = "#F7F3E9";
const ROSE_BORDER = "#C4A69D";

// Only use backend imageUrl. If missing, return null.
const getCategoryImage = (category) => {
  if (!category) return null;
  return category.imageUrl ?? null;
};

export default function ShopByRoom({ limit = 3 }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const ctrl = new AbortController();

    (async function fetchCategories() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/categories/tree/hierarchy`, { 
          signal: ctrl.signal 
        });
        if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
        const raw = await res.json();

        // normalize
        const arr = Array.isArray(raw) 
          ? raw 
          : Array.isArray(raw?.categories) 
          ? raw.categories 
          : [];

        // pick parent categories only
        const parents = arr.filter((c) => !c.parentId).slice(0, limit);

        // map per-item
        const mapped = parents.map((c, index) => {
          const image = getCategoryImage(c);
          
          return {
            id: c.id ?? c._id ?? c.slug ?? `cat-${index}`,
            name: c.name ?? `Category ${index + 1}`,
            imageUrl: image,
            href: c.slug ? `/category/${c.slug}` : `/category/${c.id ?? c._id ?? ""}`,
          };
        });

        if (mounted) setRooms(mapped);
      } catch (err) {
        console.error("ShopByRoom fetch error:", err);
        if (mounted) setRooms([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, [limit]);

  return (
    <section style={{ background: SECTION_BG }} className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#222] mb-12">
          Shop by room
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 lg:gap-12">
          {loading ? (
            // Skeleton loaders
            Array.from({ length: limit }).map((_, i) => (
              <div key={`sk-${i}`} className="flex flex-col items-center">
                <div 
                  className="w-[340px] max-w-full h-[340px] animate-pulse bg-gray-100 border-2 p-2"
                  style={{ 
                    borderRadius: '50% 50% 0 0',
                    borderColor: ROSE_BORDER,
                    borderBottom: 'none'
                  }}
                >
                  <div className="w-full h-full bg-gray-200 rounded-t-[calc(50%-8px)]" />
                </div>
                <div 
                  className="w-[340px] max-w-full h-1 border-b-2"
                  style={{ borderColor: ROSE_BORDER }}
                />
                <div className="mt-6 h-6 w-40 bg-gray-200 rounded" />
              </div>
            ))
          ) : rooms.length === 0 ? (
            <div className="text-gray-600">No categories available</div>
          ) : (
            rooms.map((room) => {
              const image = room.imageUrl;
              const isExternal = typeof image === "string" && 
                (image.startsWith("http://") || image.startsWith("https://"));

              return (
                <div key={room.id} className="flex flex-col items-center">
                  <Link href={room.href ?? "#"} className="block group">
                    <div className="flex flex-col">
                      {/* Outer border container with padding */}
                      <div 
                        className="w-[340px] max-w-full h-[340px] bg-white border-2 p-2"
                        style={{ 
                          borderRadius: '50% 50% 0 0',
                          borderColor: ROSE_BORDER,
                          borderBottom: 'none'
                        }}
                      >
                        {/* Inner image container with matching arch curve */}
                        <div 
                          className="relative w-full h-full overflow-hidden"
                          style={{ 
                            borderRadius: '50% 50% 0 0'
                          }}
                        >
                          {image ? (
                            <Image
                              src={image}
                              alt={room.name}
                              fill
                              unoptimized={isExternal}
                              className="object-cover object-top-right transition-transform duration-300 group-hover:scale-105"
                              style={{ objectPosition: 'top right' }}
                              sizes="(max-width: 640px) 100vw, 340px"
                              onError={(e) => {
                                console.error(`Image failed to load for ${room.name}:`, image);
                              }}
                            />
                          ) : (
                            // Fallback when no image
                            <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400 text-4xl font-medium select-none">
                              {room.name?.charAt(0) ?? ""}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Bottom border line */}
                      <div 
                        className="w-[340px] max-w-full h-0 border-b-2"
                        style={{ borderColor: ROSE_BORDER }}
                      />
                    </div>
                  </Link>

                  {/* Category name below */}
                  <h3 className="mt-6 text-xl lg:text-2xl font-semibold text-[#2a1b1a]">
                    {room.name}
                  </h3>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
