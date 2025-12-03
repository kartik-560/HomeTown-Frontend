// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { allProducts } from "../data/products";

// // Use a consistent source of truth: pick first 6 sofas
// const products = (allProducts.sofas || []).slice(0, 6).map(p => ({
//   id: p.id,
//   name: p.name,
//   price: `₹${p.price.toLocaleString('en-IN')}`,
//   image1: p.image1,
//   image2: p.image2,
//   category: p.category
// }));

// export default function NewArrival() {
//   return (
//     <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-12 bg-[#FCFCF6]">
//       <div className="mb-12 text-center">
//         <h2
//           className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide inline-block"
//           style={{
//             color: "#A0937D",
//             letterSpacing: "0.1em",
//           }}
//         >
//           New Arrivals
//         </h2>
//         <div
//           style={{
//             background: "#E7D4B5",
//             height: "6px",
//             width: "140px",
//             margin: "16px auto 0 auto",
//             borderRadius: "6px",
//           }}
//         />
//       </div>

//       {/* Grid wrapper */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-4 flex flex-col transition-shadow hover:shadow-lg relative w-full max-w-xs mx-auto"
//             style={{ fontSize: "0.95rem", minHeight: "420px" }}
//           >
//             {/* Product image with hover */}
//             <Link href={`/products/${product.category}/${product.id}`} className="relative w-full aspect-square flex items-center justify-center mb-4 overflow-hidden group">
//               <Image
//                 src={product.image1}
//                 alt={product.name}
//                 fill
//                 className="object-contain transition-opacity rounded-lg group-hover:opacity-0"
//               />
//               <Image
//                 src={product.image2}
//                 alt={product.name}
//                 fill
//                 className="object-contain rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
//               />
//             </Link>

//             {/* Details + Button */}
//             <div className="flex flex-col flex-grow justify-between">
//               <div className="mb-4 text-center">
//                 <div className="font-semibold text-gray-900 text-base">
//                   {product.name}
//                 </div>
//                 <div className="text-sm text-gray-500 mt-1">{product.price}</div>
//               </div>

//               <Link
//                 href={`/products/${product.category}/${product.id}`}
//                 className="w-full py-2 rounded text-sm font-semibold transition-colors border mt-auto"
//                 style={{
//                   backgroundColor: "#A0937D",
//                   color: "#fff",
//                   borderColor: "#A0937D",
//                 }}
//               >
//                 + Order
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function NewArrival() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`
//         );
        
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
        
//         const data = await response.json();
        
//         // Get first 6 active products
//         const newArrivals = data.slice(0, 6).map(p => ({
//           id: p.id,
//           name: p.name,
//           price: p.discountedPrice || p.originalPrice,
//           originalPrice: p.originalPrice,
//           discountPercentage: p.discountPercentage,
//           image1: p.imageUrls?.[0] || "/placeholder.jpg",
//           image2: p.imageUrls?.[1] || p.imageUrls?.[0] || "/placeholder.jpg",
//           categoryIds: p.categoryIds
//         }));
        
//         setProducts(newArrivals);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-12 bg-[#FCFCF6]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0937D] mx-auto"></div>
//           <p className="text-gray-600 mt-4">Loading new arrivals...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-12 bg-[#FCFCF6]">
//       <div className="mb-12 text-center">
//         <h2
//           className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide inline-block"
//           style={{
//             color: "#A0937D",
//             letterSpacing: "0.1em",
//           }}
//         >
//           New Arrivals
//         </h2>
//         <div
//           style={{
//             background: "#E7D4B5",
//             height: "6px",
//             width: "140px",
//             margin: "16px auto 0 auto",
//             borderRadius: "6px",
//           }}
//         />
//       </div>

//       {/* Grid wrapper */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-4 flex flex-col transition-shadow hover:shadow-lg relative w-full max-w-xs mx-auto"
//               style={{ fontSize: "0.95rem", minHeight: "420px" }}
//             >
//               {/* Discount Badge */}
//               {product.discountPercentage && (
//                 <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
//                   {product.discountPercentage}% OFF
//                 </div>
//               )}

//               {/* Product image with hover */}
//               <Link 
//                 href={`/products/${product.id}`}
//                 className="relative w-full aspect-square flex items-center justify-center mb-4 overflow-hidden group"
//               >
//                 <Image
//                   src={product.image1}
//                   alt={product.name}
//                   fill
//                   className="object-contain transition-opacity rounded-lg group-hover:opacity-0"
//                 />
//                 <Image
//                   src={product.image2}
//                   alt={product.name}
//                   fill
//                   className="object-contain rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                 />
//               </Link>

//               {/* Details + Button */}
//               <div className="flex flex-col flex-grow justify-between">
//                 <div className="mb-4 text-center">
//                   <div className="font-semibold text-gray-900 text-base line-clamp-2">
//                     {product.name}
//                   </div>
//                   <div className="flex items-center justify-center gap-2 mt-2">
//                     <span className="text-lg font-bold text-[#A0937D]">
//                       ₹{product.price?.toLocaleString("en-IN") || "N/A"}
//                     </span>
//                     {product.originalPrice && product.originalPrice !== product.price && (
//                       <span className="text-sm text-gray-500 line-through">
//                         ₹{product.originalPrice?.toLocaleString("en-IN")}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <Link
//                   href={`/products/${product.id}`}
//                   className="w-full py-2 rounded text-sm font-semibold transition-colors border mt-auto"
//                   style={{
//                     backgroundColor: "#A0937D",
//                     color: "#fff",
//                     borderColor: "#A0937D",
//                   }}
//                 >
//                   + view Details
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-600">
//             <p>No products available</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";



export default function NewArrival({ limit = 9 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // helper: safe map
  const mapProduct = (p) => {
    // backend may use different property names; adapt here
    const id = p.id ?? p._id ?? p.productId;
    const name = p.name ?? p.title ?? "Untitled product";
    const images = p.imageUrls ?? p.images ?? p.pictures ?? [];
    const image1 = images[0] ?? "/placeholder.jpg";
    const image2 = images[1] ?? images[0] ?? "/placeholder.jpg";

    // price fallbacks
    const originalPrice = p.originalPrice ?? p.price ?? p.mrp ?? null;
    // some APIs store discounted price separately
    const discountedPrice = p.discountedPrice ?? p.salePrice ?? p.finalPrice ?? originalPrice;

    // discount percentage calculation if not provided
    let discountPercentage = p.discountPercentage ?? null;
    if (!discountPercentage && originalPrice && discountedPrice && originalPrice > discountedPrice) {
      discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }

    // optional flags
    const isNew = p.isNew ?? p.newArrival ?? false;
    const isBest = p.tags?.includes("bestseller") ?? p.isBestseller ?? false;

    return {
      id,
      name,
      image1,
      image2,
      price: discountedPrice,
      originalPrice,
      discountPercentage,
      isNew,
      isBest,
      raw: p,
    };
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
        const res = await fetch(`${base}/api/products`, { signal: abortCtrl.signal });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`API error: ${res.status} ${text}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("API returned unexpected shape (expected array).");
        }

        // map and slice
        const mapped = data.map(mapProduct).filter(Boolean).slice(0, limit);
        setProducts(mapped);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("NewArrival fetch error:", err);
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => abortCtrl.abort();
  }, [limit]);

  // small skeleton card to show while loading
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-4 animate-pulse">
      <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="mt-4 h-9 bg-gray-200 rounded w-full" />
    </div>
  );

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-12 bg-[#FCFCF6]">
      <div className="mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide inline-block" style={{ color: "#A0937D", letterSpacing: "0.1em" }}>
          New Arrivals
        </h2>
        <div style={{ background: "#E7D4B5", height: "6px", width: "140px", margin: "16px auto 0", borderRadius: "6px" }} />
      </div>

      {error && (
        <div className="mb-6 text-center text-red-600">Error loading new arrivals: {error}</div>
      )}

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? // show skeletons (match number of columns)
            Array.from({ length: limit }).map((_, i) => <SkeletonCard key={`s-${i}`} />)
          : products.length > 0 ? (
              products.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-4 flex flex-col transition-shadow hover:shadow-lg relative"
                  style={{ fontSize: "0.95rem", minHeight: 380 }}
                >
                  {/* Left/top badges */}
                  <div className="absolute top-3 left-3 flex gap-2 items-center z-10">
                    {product.isNew && <span className="bg-green-600 text-white px-2 py-0.5 text-xs rounded-full font-semibold">NEW</span>}
                    {product.isBest && <span className="bg-orange-500 text-white px-2 py-0.5 text-xs rounded-full font-semibold">BEST</span>}
                  </div>

                  {/* Discount badge (right) */}
                  {product.discountPercentage ? (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                      {product.discountPercentage}% OFF
                    </div>
                  ) : null}

                  {/* Product image with hover swap */}
                  <Link href={`/products/${product.id}`} className="relative w-full aspect-square flex items-center justify-center mb-4 overflow-hidden group rounded-lg">
                    {/* Using next/image unoptimized to avoid domain issues; change when domains configured */}
                    <Image
                      src={product.image1}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-opacity duration-300 rounded-lg group-hover:opacity-0"
                      loading="lazy"
                    />
                    <Image
                      src={product.image2}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-2">{product.name}</h3>

                      <div className="flex items-baseline gap-3">
                        <span className="text-lg font-bold text-[#A0937D]">₹{Number(product.price).toLocaleString("en-IN")}</span>
                        {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                          <span className="text-sm text-gray-400 line-through">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
                        )}
                      </div>

                      {/* small category/metadata chips (optional) */}
                      {product.raw?.categories && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {product.raw.categories.slice(0, 2).map((c, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{c.name ?? c}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex-1 inline-flex items-center justify-center py-2 rounded text-sm font-semibold transition-colors"
                          style={{ backgroundColor: "#A0937D", color: "#fff", border: "1px solid #A0937D" }}
                        >
                          View details
                        </Link>

                        {/* Add-to-cart could be wired to cart handler; placeholder */}
                        <button
                          type="button"
                          className="px-3 py-2 rounded border text-sm font-semibold text-[#A0937D] hover:bg-[#f5efe6]"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">No products available</div>
            )}
      </div>
    </section>
  );
}

