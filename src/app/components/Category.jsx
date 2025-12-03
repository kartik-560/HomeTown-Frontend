"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


function SkeletonTile() {
  return (
    <div className="rounded-lg overflow-hidden bg-white p-0 shadow-sm animate-pulse">
      <div className="w-full aspect-square
 bg-gray-100" />
    </div>
  );
}

// Helper: safe price picker (many backends use different keys)
function extractStartingPrice(cat) {
  if (!cat) return null;
  const candidates = [
    cat.minPrice,
    cat.startingPrice,
    cat.minOfferPrice,
    cat.priceFrom,
    cat.priceRange?.min,
    cat.price?.min,
    cat.lowestPrice,
  ];
  for (const c of candidates) {
    if (typeof c === "number" && !Number.isNaN(c)) return c;
    if (typeof c === "string" && c.trim() !== "") {
      const numeric = Number(c.replace(/[^\d.]/g, ""));
      if (!Number.isNaN(numeric)) return numeric;
    }
  }
  return null;
}

export default function Category({ limit = 12, apiPath = null }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint =
    apiPath ||
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories/tree/hierarchy`;

  useEffect(() => {
    const ctrl = new AbortController();
    let mounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(endpoint, { signal: ctrl.signal });
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Fetch failed: ${res.status} ${txt}`);
        }

        const raw = await res.json();

        // Normalize response → always an array
        let normalized;
        if (Array.isArray(raw)) {
          normalized = raw;
        } else if (raw?.categories && Array.isArray(raw.categories)) {
          normalized = raw.categories;
        } else {
          console.error("Unexpected category API shape:", raw);
          throw new Error("Unexpected API response shape for categories");
        }

        // Only parent categories (no parentId) and limit
        const parents = normalized.filter((c) => !c.parentId).slice(0, limit);

        if (mounted) setCategories(parents);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Error fetching categories:", err);
        if (mounted) {
          setError(err.message || "Failed to load categories");
          setCategories([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, [endpoint, limit]);

  // Only use backend imageUrl. If missing, return null.
  const getCategoryImage = (category) => {
    if (!category) return null;
    return category.imageUrl ?? null;
  };

  const tileVariant = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.06, duration: 0.45 } }),
  };

  return (
    <section
      id="shop-by-category"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 scroll-mt-24"
    >
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#5C4033] leading-snug"
        >
          Popular <span className="text-rose-400">categories</span>
        </motion.h2>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto text-center mb-6">
          <p className="text-red-600 mb-3">Failed to load categories: {error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              setCategories([]);
              // simple retry: re-fetch immediately
              (async () => {
                try {
                  const res = await fetch(endpoint);
                  const raw = await res.json();
                  const normalized = Array.isArray(raw) ? raw : raw?.categories ?? [];
                  const parents = (normalized.filter?.((c) => !c.parentId) ?? []).slice(0, limit);
                  setCategories(parents);
                } catch (e) {
                  setError(e.message || "Retry failed");
                } finally {
                  setLoading(false);
                }
              })();
            }}
            className="inline-block px-4 py-2 rounded bg-[#A0937D] text-white"
          >
            Retry
          </button>
        </div>
      )}

      <div
        role="list"
        aria-label="Popular categories"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto"
      >
        {loading
          ? Array.from({ length: Math.min(limit, 8) }).map((_, i) => <SkeletonTile key={`sk-${i}`} />)
          : categories.length > 0
          ? categories.map((cat, idx) => {
              const image = getCategoryImage(cat);
              const isExternal = typeof image === "string" && (image.startsWith("http://") || image.startsWith("https://"));
              const href = cat.slug ? `/category/${cat.slug}` : `/category/${cat.id}`;

              const startingPrice = extractStartingPrice(cat);
              const priceText = startingPrice ? `₹${Number(startingPrice).toLocaleString("en-IN")} Onwards` : null;

              return (
                <motion.div
                  role="listitem"
                  custom={idx}
                  variants={tileVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  key={cat.id || `${cat.name}-${idx}`}
                  className={`${idx % 2 === 0 ? "translate-y-3 sm:translate-y-4" : "-translate-y-3 sm:-translate-y-4"}`}
                >
                  <Link href={href} className="group block text-left focus:outline-none" aria-label={`Open category ${cat.name}`}>
                    <div className={`relative w-full aspect-square
 overflow-hidden rounded-lg shadow-sm ${!image ? "bg-gray-100 border border-gray-100" : "bg-white"}`}>
                      {image ? (
                        <Image
                          src={image}
                          alt={cat.name}
                          fill
                          unoptimized={isExternal}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      ) : (
                        // Neutral tile when no image provided
                        <div className="flex items-center justify-center h-full text-gray-500 text-3xl font-medium select-none">
                          {/* show first letter subtly */}
                          {cat.name?.charAt(0) ?? ""}
                        </div>
                      )}

                      {/* bottom overlay with gradient for readability */}
                      <div className="absolute left-0 right-0 bottom-0 pointer-events-none">
                        <div className="h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      {/* Name + price on overlay */}
                      <div className="absolute left-4 bottom-4 right-4 pointer-events-none">
                        <div className="text-white font-semibold text-lg leading-tight drop-shadow-md">{cat.name}</div>
                        {priceText && (
                          <div className="text-white/80 text-sm mt-1 drop-shadow-sm italic">{priceText}</div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          : (
              <div className="col-span-full text-center text-gray-600">
                <p>No categories available</p>
              </div>
            )}
      </div>
    </section>
  );
}



