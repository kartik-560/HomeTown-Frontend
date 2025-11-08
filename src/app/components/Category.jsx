// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const categories = [
//   { name: "Sofas", href: "/sofas", image: "/images/gi3.png" },
//   { name: "Recliners", href: "/recliners", image: "/images/gi1.png" },
//   { name: "Beds", href: "/beds", image: "/images/gi2.png" },
//   { name: "Center Tables", href: "/center-tables", image: "/images/gi4.png" },
//   { name: "Dining Sets", href: "/dining", image: "/images/gi5.png" },
//   { name: "Cabinets", href: "/cabinets", image: "/images/gi6.png" },
//   { name: "Dressing Tables", href: "/dressing", image: "/images/gi7.png" },
//   { name: "Cushions", href: "/cushions", image: "/images/gi11.png" },
//   { name: "Curtains", href: "/curtains", image: "/images/gi8.png" },
//   { name: "Planters", href: "/planters", image: "/images/gi13.png" },
//   { name: "Figurines", href: "/figurines", image: "/images/gi14.png" },
//   { name: "Paintings", href: "/paintings", image: "/images/gi9.png" },
// ];

// export default function Category() {
//   return (
//     <section id="shop-by-category" className="w-full bg-gradient-to-br from-[#F6E6CB] via-[#E7D4B5] to-[#F6E6CB] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 scroll-mt-24">
//       {/* Heading */}
//       <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#5C4033] leading-snug"
//         >
//           Shop by Category
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           viewport={{ once: true }}
//           className="mt-3 sm:mt-4 text-base sm:text-lg text-[#6B4F3D] px-2 sm:px-0"
//         >
//           Find the perfect furniture & décor for every corner of your home.
//         </motion.p>
//       </div>

//       {/* Category Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
//         {categories.map((cat, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             whileInView={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ delay: idx * 0.05, duration: 0.5 }}
//             viewport={{ once: true }}
//             className={`${idx % 2 === 0 ? "translate-y-3 sm:translate-y-4" : "-translate-y-3 sm:-translate-y-4"}`}
//           >
//             <Link href={`/furniture${cat.href}`} className="group block text-center">
//               {/* Floating Image */}
//               <motion.div
//                 initial={{ x: 0 }}
//                 animate={{ x: [0, 6, -6, 0] }}
//                 transition={{
//                   duration: 6,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: idx * 0.2,
//                 }}
//                 className="relative w-full aspect-square overflow-hidden"
//               >
//                 <Image
//                   src={cat.image}
//                   alt={cat.name}
//                   fill
//                   className="object-contain transition-transform duration-500 group-hover:scale-105"
//                 />
//               </motion.div>

//               {/* Text */}
//               <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-semibold text-[#4A2C2A] group-hover:text-[#2F1B18] transition">
//                 {cat.name}
//               </p>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Fallback category images
const CATEGORY_IMAGES = {
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
};

// Default background colors for categories
const CATEGORY_COLORS = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-green-400 to-green-600",
  "from-yellow-400 to-yellow-600",
  "from-red-400 to-red-600",
  "from-indigo-400 to-indigo-600",
  "from-teal-400 to-teal-600",
  "from-orange-400 to-orange-600",
  "from-cyan-400 to-cyan-600",
  "from-lime-400 to-lime-600",
  "from-rose-400 to-rose-600",
];

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // Get only parent categories (parentId is null)
        const parentCategories = data.filter(cat => !cat.parentId);

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

  // Function to get image for category (real image or fallback)
  const getCategoryImage = (category, index) => {
    // Priority 1: Use category's imageUrl from backend
    if (category.imageUrl) {
      return category.imageUrl;
    }

    // Priority 2: Use predefined fallback images
    if (CATEGORY_IMAGES[category.name]) {
      return CATEGORY_IMAGES[category.name];
    }

    // Priority 3: Return null and use colored background
    return null;
  };

  // Get color gradient for category
  const getCategoryColor = (index) => {
    return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
  };

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-br from-[#F6E6CB] via-[#E7D4B5] to-[#F6E6CB] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0937D] mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading categories...</p>
        </div>
      </section>
    );
  }

return (
  <section id="shop-by-category" className="w-full bg-gradient-to-br from-[#F6E6CB] via-[#E7D4B5] to-[#F6E6CB] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 scroll-mt-24">
    {/* Heading */}
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#5C4033] leading-snug"
      >
        Shop by Category
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-3 sm:mt-4 text-base sm:text-lg text-[#6B4F3D] px-2 sm:px-0"
      >
        Find the perfect furniture & décor for every corner of your home.
      </motion.p>
    </div>

    {/* Category Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
      {categories.length > 0 ? (
        categories.map((cat, idx) => {
          const image = getCategoryImage(cat, idx);
          const bgColor = getCategoryColor(idx);
          const isExternalImage = image && image.startsWith('http');

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className={`${idx % 2 === 0 ? "translate-y-3 sm:translate-y-4" : "-translate-y-3 sm:-translate-y-4"}`}
            >
              <Link href={`/category/${cat.id}`} className="group block text-center">
                {/* Image Container */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 6, -6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2,
                  }}
                  className={`relative w-full aspect-square overflow-hidden rounded-lg  ${
                    !image ? `bg-gradient-to-br ${bgColor} flex items-center justify-center` : ""
                  }`}
                >
                  {image ? (
                    <Image
                      src={image}
                      alt={cat.name}
                      fill
                      unoptimized={isExternalImage}
                      className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    // Fallback: Show colored background with category name icon
                    <div className="flex flex-col items-center justify-center text-white">
                      <div className="text-4xl sm:text-5xl mb-3 font-bold">
                        {cat.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Text */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-semibold text-[#4A2C2A] group-hover:text-[#2F1B18] transition">
                  {cat.name}
                </p>
              </Link>
            </motion.div>
          );
        })
      ) : (
        <div className="col-span-full text-center text-gray-600">
          <p>No categories available</p>
        </div>
        )}
    </div>
  </section>
);

}

