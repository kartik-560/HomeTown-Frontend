// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { allProducts } from "../data/products";
// import { useRef } from "react";

// // Pull from data so links work
// const products = (allProducts.sofas || []).slice(0, 10).map(p => ({
//   id: p.id,
//   name: p.name,
//   price: `₹${p.price.toLocaleString('en-IN')}`,
//   oldPrice: `₹${p.oldPrice.toLocaleString('en-IN')}`,
//   discount: `${p.discount}% Off`,
//   image1: p.image1,
//   image2: p.image2,
//   category: p.category
// }));

// export default function ProductCard() {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const scrollAmount = 350;
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="py-8 px-3 sm:px-6" style={{ background: "#FAFAFA" }}>
//       <div className="relative">
//         {/* Product List */}
//         <div
//           className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 scroll-smooth"
//           ref={scrollRef}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="flex-none w-[240px] sm:w-[280px] md:w-[325px] min-h-[400px] sm:min-h-[430px] md:min-h-[460px] 
//               bg-white rounded-xl sm:rounded-2xl border border-[#EFEFEF] shadow flex flex-col justify-between relative"
//             >
//               {/* Discount badge */}
//               <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#A0937D] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded shadow z-10">
//                 {product.discount}
//               </span>

//               {/* Product image area with hover swap */}
//               <Link href={`/products/${product.category}/${product.id}`} className="relative w-full flex-grow flex items-center justify-center py-6 sm:py-8 group cursor-pointer">
//                 <div className="relative h-[220px] w-[80%] mx-auto">
//                   <Image
//                     src={product.image1}
//                     alt={product.name}
//                     fill
//                     className="object-cover transition-opacity rounded-lg group-hover:opacity-0"
//                   />
//                   <Image
//                     src={product.image2}
//                     alt={product.name}
//                     fill
//                     className="object-cover rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                   />
//                 </div>
//               </Link>

//               {/* DETAILS & Button */}
//               <div className="flex flex-col gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 mb-5 sm:mb-6 md:mb-7">
//                 <div className="text-sm sm:text-base md:text-[17px] font-medium text-gray-900">
//                   {product.name}
//                 </div>
//                 <div className="mb-3 sm:mb-4 text-sm sm:text-base text-[#a0937d] font-semibold">
//                   {product.price}
//                 </div>
//                 <Link
//                   href={`/products/${product.category}/${product.id}`}
//                   className="w-full text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5 rounded-lg border transition-colors"
//                   style={{
//                     backgroundColor: "#A0937D",
//                     borderColor: "#A0937D",
//                   }}
//                 >
//                   + Order
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hidden sm:block"
//           aria-label="Scroll left"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hidden sm:block"
//           aria-label="Scroll right"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * BestsellerSection.jsx
 *
 * - Renders a "Our Bestsellers" section with pill tabs (5 subcategories).
 * - Tabs come from category children (subcategories). We choose the first parent category that has children.
 * - When a tab is selected we attempt to load products by category via `GET /api/products?categoryId=<id>&limit=8`.
 *   If that endpoint doesn't exist, we fetch all products and filter locally where `product.categoryIds` contains the subcategory id.
 *
 * Backend expectations (flexible):
 * - GET `${API_BASE}/api/categories/tree/hierarchy` returns an array of categories or { categories: [...] }.
 *   Each category may have `id`, `name`, `slug`, `parentId`, `children` (optional), `createdAt` (optional).
 * - GET `${API_BASE}/api/products` returns an array of products with at least:
 *   { id, name, imageUrls: [], originalPrice, discountedPrice, discountPercentage, categoryIds: [] }
 *
 * Notes:
 * - Customize `API_BASE` via NEXT_PUBLIC_API_URL
 * - Adjust `CARD_PER_ROW` if you want different grid counts.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TAB_LIMIT = 5; // number of subcategories to show
const PRODUCTS_LIMIT = 8; // per tab

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#EFEFEF] shadow-sm p-4 animate-pulse min-h-[360px]">
      <div className="w-full h-[180px] bg-gray-100 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-9 bg-gray-200 rounded w-full" />
    </div>
  );
}

function ProductCard({ product }) {
  const image1 = product.imageUrls?.[0] ?? product.image1 ?? "/placeholder.jpg";
  const image2 = product.imageUrls?.[1] ?? product.image2 ?? image1;
  const discount = product.discountPercentage ?? product.discount ?? 0;
  const price = product.discountedPrice ?? product.price ?? product.originalPrice ?? null;
  const original = product.originalPrice ?? product.price ?? null;

  return (
    <article className="bg-white rounded-2xl border border-[#EFEFEF] shadow-sm overflow-hidden">
      <div className="relative">
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 bg-rose-400 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% Off
          </span>
        )}

        <Link href={`/products/${product.id}`} className="group block relative">
          <div className="w-full h-[220px] md:h-[230px] lg:h-[250px] relative">
            <Image
              src={image1}
              alt={product.name}
              fill
              unoptimized
              className="object-cover rounded-t-2xl transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={image2}
              alt={product.name}
              fill
              unoptimized
              className="object-cover rounded-t-2xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </Link>
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-[15px] font-medium text-gray-900 mb-3 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-lg md:text-[18px] font-semibold text-[#A0937D]">
            {price ? `₹${Number(price).toLocaleString("en-IN")}` : "—"}
          </span>
          {original && Number(original) > Number(price) && (
            <span className="text-xs md:text-sm text-gray-400 line-through">
              ₹{Number(original).toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BestsellerSection() {
  const [tabs, setTabs] = useState([]); // { id, name, slug }
  const [activeTab, setActiveTab] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingTabs, setLoadingTabs] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorTabs, setErrorTabs] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);

  // Step 1: fetch categories and pick a parent with children; then use its children (or subcategories)
  useEffect(() => {
    let mounted = true;
    const ctrl = new AbortController();

    const fetchCategories = async () => {
      setLoadingTabs(true);
      setErrorTabs(null);
      try {
        const res = await fetch(`${API_BASE}/api/categories/tree/hierarchy`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`Categories fetch failed: ${res.status}`);
        const raw = await res.json();
        // normalize
        const normalized = Array.isArray(raw) ? raw : Array.isArray(raw?.categories) ? raw.categories : [];

        // find first parent that has children, or fallback to parents that exist
        let chosenParent = null;
        for (const c of normalized) {
          if (c.children && Array.isArray(c.children) && c.children.length > 0) {
            chosenParent = c;
            break;
          }
        }

        // fallback: find some parent-child relation by inspecting parentId fields
        if (!chosenParent) {
          // find any category that has other categories with parentId = its id
          for (const c of normalized) {
            const hasChildren = normalized.some((x) => x.parentId && x.parentId === c.id);
            if (hasChildren) {
              chosenParent = c;
              break;
            }
          }
        }

        // final fallback: use first category and treat its siblings/children as tabs
        const candidateTabs = [];
        if (chosenParent) {
          const children = chosenParent.children && Array.isArray(chosenParent.children)
            ? chosenParent.children
            : normalized.filter((x) => x.parentId === chosenParent.id);
          // sort by createdAt descending if present to get 'latest', else keep original order
          const sorted = (children || []).sort((a, b) => {
            if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
            return 0;
          });
          for (const ch of sorted.slice(0, TAB_LIMIT)) {
            candidateTabs.push({ id: ch.id, name: ch.name, slug: ch.slug ?? ch.id });
          }
        } else {
          // fallback: pick top-level categories and take their first 5 children if exist
          const parents = normalized.filter((c) => !c.parentId).slice(0, 6);
          for (const p of parents) {
            // try to get children
            const children = p.children && Array.isArray(p.children)
              ? p.children
              : normalized.filter((x) => x.parentId === p.id);
            const sorted = (children || []).sort((a,b) => (a.createdAt && b.createdAt) ? (new Date(b.createdAt) - new Date(a.createdAt)) : 0);
            for (const ch of sorted.slice(0, TAB_LIMIT)) {
              if (candidateTabs.length >= TAB_LIMIT) break;
              candidateTabs.push({ id: ch.id, name: ch.name, slug: ch.slug ?? ch.id });
            }
            if (candidateTabs.length >= TAB_LIMIT) break;
          }
        }

        if (mounted) {
          setTabs(candidateTabs);
          setActiveTab(candidateTabs[0]?.id ?? null);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          if (mounted) setErrorTabs(err.message || "Failed to load tabs");
        }
      } finally {
        if (mounted) setLoadingTabs(false);
      }
    };

    fetchCategories();
    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, []);

  // Step 2: load products for active tab
  useEffect(() => {
    if (!activeTab) return;
    let mounted = true;
    const ctrl = new AbortController();

    const fetchProductsForTab = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      setProducts([]);

      try {
        // Preferred: try filtered endpoint
        const filteredRes = await fetch(`${API_BASE}/api/products?categoryId=${activeTab}&limit=${PRODUCTS_LIMIT}`, { signal: ctrl.signal });
        if (filteredRes.ok) {
          const arr = await filteredRes.json();
          if (mounted) setProducts(Array.isArray(arr) ? arr.slice(0, PRODUCTS_LIMIT) : []);
          return;
        }

        // Fallback: fetch all products and filter locally
        const resAll = await fetch(`${API_BASE}/api/products`, { signal: ctrl.signal });
        if (!resAll.ok) throw new Error(`Products fetch failed: ${resAll.status}`);
        const all = await resAll.json();
        const list = Array.isArray(all) ? all : all.items ?? [];
        // filter products that have categoryIds or categories containing activeTab
        const filtered = list.filter((p) => {
          const cats = p.categoryIds ?? p.categories ?? [];
          if (!cats) return false;
          if (Array.isArray(cats)) return cats.some((cid) => String(cid) === String(activeTab));
          // if categories are objects
          if (typeof cats === "object") {
            return Object.values(cats).some((c) => (c?.id && String(c.id) === String(activeTab)) || (c === activeTab));
          }
          return false;
        });
        if (mounted) setProducts(filtered.slice(0, PRODUCTS_LIMIT));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error loading products:", err);
          if (mounted) setErrorProducts(err.message || "Failed to load products");
        }
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    };

    fetchProductsForTab();
    return () => {
      mounted = false;
      ctrl.abort();
    };
  }, [activeTab]);

  // Render
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Our <span className="text-rose-400">Bestsellers</span>
          </h2>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {loadingTabs ? (
            <div className="flex gap-3">
              {Array.from({ length: Math.min(5, TAB_LIMIT) }).map((_,i) => (
                <div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
              ))}
            </div>
          ) : errorTabs ? (
            <div className="text-red-600">{errorTabs}</div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition ${
                    activeTab === t.id
                      ? "bg-rose-400 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-pressed={activeTab === t.id}
                  aria-label={`Filter by ${t.name}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products grid */}
        <div>
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : errorProducts ? (
            <div className="text-center text-red-600">{errorProducts}</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-600">No products found for this category.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
