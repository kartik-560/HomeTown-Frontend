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

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function ProductCard() {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Map API data to component format (first 10 products)
        const formattedProducts = data.slice(0, 10).map(p => ({
          id: p.id,
          name: p.name,
          price: p.discountedPrice || p.originalPrice,
          originalPrice: p.originalPrice,
          discount: p.discountPercentage || 0,
          image1: p.imageUrls?.[0] || "/placeholder.jpg",
          image2: p.imageUrls?.[1] || p.imageUrls?.[0] || "/placeholder.jpg",
          categoryIds: p.categoryIds,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="py-8 px-3 sm:px-6" style={{ background: "#FAFAFA" }}>
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0937D] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-3 sm:px-6" style={{ background: "#FAFAFA" }}>
      <div className="relative">
        {/* Product List */}
        <div
          className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 scroll-smooth"
          ref={scrollRef}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[240px] sm:w-[280px] md:w-[325px] min-h-[400px] sm:min-h-[430px] md:min-h-[460px] 
                bg-white rounded-xl sm:rounded-2xl border border-[#EFEFEF] shadow flex flex-col justify-between relative"
              >
                {/* Discount badge */}
                {product.discount > 0 && (
                  <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#A0937D] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded shadow z-10">
                    {product.discount}% Off
                  </span>
                )}

                {/* Product image area with hover swap */}
                <Link 
                  href={`/products/${product.id}`}
                  className="relative w-full flex-grow flex items-center justify-center py-6 sm:py-8 group cursor-pointer"
                >
                  <div className="relative h-[220px] w-[80%] mx-auto">
                    <Image
                      src={product.image1}
                      alt={product.name}
                      fill
                      className="object-contain transition-opacity rounded-lg group-hover:opacity-0"
                    />
                    <Image
                      src={product.image2}
                      alt={product.name}
                      fill
                      className="object-contain rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Link>

                {/* DETAILS & Button */}
                <div className="flex flex-col gap-1 sm:gap-2 px-4 sm:px-6 md:px-8 mb-5 sm:mb-6 md:mb-7">
                  <div className="text-sm sm:text-base md:text-[17px] font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </div>
                  <div className="mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-sm sm:text-base text-[#a0937d] font-semibold">
                      ₹{product.price?.toLocaleString("en-IN") || "N/A"}
                    </span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ₹{product.originalPrice?.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="w-full text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5 rounded-lg border transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: "#A0937D",
                      borderColor: "#A0937D",
                    }}
                  >
                    + view Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-600">
              <p>No products available</p>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {products.length > 0 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hidden sm:block hover:shadow-xl transition-shadow"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg z-10 hidden sm:block hover:shadow-xl transition-shadow"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
