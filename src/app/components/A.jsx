// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// const categories = [
//   { id: 1, name: "Wallstorage", image: "/images/gi20.png" },
//   { id: 2, name: "Corner Sofa", image: "/images/gi21.png" },
//   { id: 3, name: "Sofa", image: "/images/gi22.png" },
//   { id: 4, name: "Bookcase", image: "/images/gi23.png" },
//   { id: 5, name: "Sideboard", image: "/images/gi24.png" },
//   { id: 6, name: "Tv stand", image: "/images/gi25.png" },
// ];

// // Responsive sticker layout with position adjustments
// const stickerLayout = [
//   // Wallstorage - Top Left
//   { idx: 0, style: { top: "7%", left: "7%" }, responsive: { sm: { top: "6%", left: "5%" } } },
//   // Corner Sofa - Top Right
//   { idx: 1, style: { top: "7%", right: "7%" }, responsive: { sm: { top: "6%", right: "5%" } } },
//   // Sofa - Bottom Left
//   { idx: 2, style: { bottom: "10%", left: "7%" }, responsive: { sm: { bottom: "8%", left: "5%" } } },
//   // Bookcase - Bottom Right
//   { idx: 3, style: { bottom: "10%", right: "7%" }, responsive: { sm: { bottom: "8%", right: "5%" } } },
//   // Sideboard - Higher and centered ABOVE text
//   {
//     idx: 4,
//     style: { top: "1%", left: "42%", transform: "translateX(-50%)" },
//     responsive: { sm: { top: "2%", left: "50%", transform: "translateX(-50%)" } },
//   },
//   // Tv stand - Slightly left of center near bottom
//   {
//     idx: 5,
//     style: { bottom: "5%", left: "42%", transform: "translateX(-42%)" },
//     responsive: { sm: { bottom: "6%", left: "50%", transform: "translateX(-50%)" } },
//   },
// ];

// export default function A() {
//   const [hoveredId, setHoveredId] = useState(null);

//   return (
//     <section className="relative min-h-[100vh] pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto bg-[#f7f3e9] rounded-3xl overflow-visible">
//       {/* Absolutely centered responsive text */}
//       <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center pointer-events-none px-4">
//         <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#4b2e2e] drop-shadow-lg tracking-tight leading-none text-center">
//           Pick Your Design
//         </h2>
//         <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl text-[#7a3e3e] font-medium text-center max-w-2xl">
//           Style your home beautifully with our curated collections
//         </p>
//       </div>

//       {/* Stickers with bobbing animation */}
//       {stickerLayout.map((st, i) => {
//         const cat = categories[st.idx];
//         const isHovered = hoveredId === cat.id;
//         return (
//           <motion.div
//             key={cat.id}
//             className="absolute flex flex-col items-center z-20"
//             style={st.style}
//             onMouseEnter={() => setHoveredId(cat.id)}
//             onMouseLeave={() => setHoveredId(null)}
//             whileHover={{ scale: 1.08 }}
//           >
//             <Link href="#shop-by-category" aria-label={`Explore ${cat.name}`}>
//             <motion.div
//               animate={{ y: [0, -15, 0] }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: i * 0.3,
//               }}
//               className="relative w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 flex flex-col items-center"
//             >
//               <Image
//                 src={cat.image}
//                 alt={cat.name}
//                 width={250}
//                 height={250}
//                 className="object-contain drop-shadow-xl mx-auto"
//               />
//               {/* Tooltip ABOVE image */}
//               <AnimatePresence>
//                 {isHovered && (
//                   <motion.span
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-[#4b2e2e] px-4 py-1 text-sm sm:text-base font-semibold text-white select-none shadow-lg pointer-events-none whitespace-nowrap"
//                   >
//                     {cat.name}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//             </Link>
//           </motion.div>
//         );
//       })}
//     </section>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Responsive sticker layout with position adjustments
const stickerLayout = [
  { idx: 0, style: { top: "7%", left: "7%" }, responsive: { sm: { top: "6%", left: "5%" } } },
  { idx: 1, style: { top: "7%", right: "7%" }, responsive: { sm: { top: "6%", right: "5%" } } },
  { idx: 2, style: { bottom: "10%", left: "7%" }, responsive: { sm: { bottom: "8%", left: "5%" } } },
  { idx: 3, style: { bottom: "10%", right: "7%" }, responsive: { sm: { bottom: "8%", right: "5%" } } },
  {
    idx: 4,
    style: { top: "1%", left: "42%", transform: "translateX(-50%)" },
    responsive: { sm: { top: "2%", left: "50%", transform: "translateX(-50%)" } },
  },
  {
    idx: 5,
    style: { bottom: "5%", left: "42%", transform: "translateX(-42%)" },
    responsive: { sm: { bottom: "6%", left: "50%", transform: "translateX(-50%)" } },
  },
];

// Fallback images for categories
const FALLBACK_IMAGES = {
  Sofas: "/images/gi3.png",
  Recliners: "/images/gi1.png",
  Beds: "/images/gi2.png",
  "Center Tables": "/images/gi4.png",
  "Dining Sets": "/images/gi5.png",
  Cabinets: "/images/gi6.png",
  "Dressing Tables": "/images/gi7.png",
  Cushions: "/images/gi11.png",
  Curtains: "/images/gi8.png",
  Planters: "/images/gi13.png",
  Figurines: "/images/gi14.png",
  Paintings: "/images/gi9.png",
  Wallstorage: "/images/gi20.png",
  "Corner Sofa": "/images/gi21.png",
  Sofa: "/images/gi22.png",
  Bookcase: "/images/gi23.png",
  Sideboard: "/images/gi24.png",
  "Tv stand": "/images/gi25.png",
};

// Generic placeholder SVG for when all else fails
const PlaceholderSVG = ({ name }) => (
  <div className="w-full h-full bg-gradient-to-br from-[#E7D4B5] to-[#A0937D] flex items-center justify-center rounded-lg">
    <div className="text-center">
      <div className="text-5xl mb-2">📦</div>
      <p className="text-[#4b2e2e] font-semibold text-sm text-center px-2 line-clamp-2">
        {name}
      </p>
    </div>
  </div>
);

export default function StickersSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories/tree/hierarchy`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        // Get only parent categories (without parentId) and limit to 6
        const parentCategories = data
          .filter(cat => !cat.parentId)
          .slice(0, 6)
          .map(cat => ({
            id: cat.id,
            name: cat.name,
            imageUrl: cat.imageUrl || null, // Changed from 'image' to 'imageUrl'
          }));

        setCategories(parentCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get appropriate image with fallback chain
  const getImageForCategory = (category) => {
    // Priority 1: Use category's imageUrl from backend if available and not errored
    if (category.imageUrl && !imageErrors[category.id]) {
      return category.imageUrl;
    }

    // Priority 2: Use predefined fallback image
    if (FALLBACK_IMAGES[category.name]) {
      return FALLBACK_IMAGES[category.name];
    }

    // Priority 3: Return null to show placeholder
    return null;
  };

  const handleImageError = (categoryId) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true,
    }));
  };

  if (loading) {
    return (
      <section className="relative min-h-[100vh] pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto bg-[#f7f3e9] rounded-3xl overflow-visible flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4b2e2e] mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading featured categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100vh] pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto bg-[#f7f3e9] rounded-3xl overflow-visible">
      {/* Absolutely centered responsive text */}
      <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center pointer-events-none px-4">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#4b2e2e] drop-shadow-lg tracking-tight leading-none text-center">
          Pick Your Design
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl text-[#7a3e3e] font-medium text-center max-w-2xl">
          Style your home beautifully with our curated collections
        </p>
      </div>

      {/* Stickers with bobbing animation */}
      {categories.length > 0 ? (
        stickerLayout.map((st, i) => {
          // Only render if category exists at this index
          if (!categories[st.idx]) return null;

          const cat = categories[st.idx];
          const isHovered = hoveredId === cat.id;
          const imageUrl = getImageForCategory(cat);
          const isExternalImage = imageUrl && imageUrl.startsWith('http');

          return (
            <motion.div
              key={cat.id}
              className="absolute flex flex-col items-center z-20"
              style={st.style}
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.08 }}
            >
              <Link
                href={`/category/${cat.id}`}
                aria-label={`Explore ${cat.name}`}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="relative w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 flex flex-col items-center cursor-pointer"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={cat.name}
                      width={250}
                      height={250}
                      unoptimized={isExternalImage} // Use unoptimized for external images
                      className="object-contain drop-shadow-xl mx-auto"
                      onError={() => handleImageError(cat.id)}
                      priority={i < 3} // Prioritize loading first 3 images
                    />
                  ) : (
                    <PlaceholderSVG name={cat.name} />
                  )}

                  {/* Tooltip ABOVE image */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-[#4b2e2e] px-4 py-1 text-sm sm:text-base font-semibold text-white select-none shadow-lg pointer-events-none whitespace-nowrap"
                      >
                        {cat.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          );
        })
      ) : (
        <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-gray-600 text-lg">No categories available</p>
        </div>
      )}
    </section>
  );
}

