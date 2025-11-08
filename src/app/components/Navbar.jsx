// "use client";

// import Link from "next/link";
// import { Search, Menu, X, ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// export default function Navbar() {
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [show, setShow] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [navItems, setNavItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const pathname = usePathname();

//   const isActive = (path) => pathname === path;

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/tree/hierarchy`
//         );
//         const categories = await response.json();

//         // Transform categories to nav items structure
//         const transformedItems = categories.map((category) => ({
//           label: category.name,
//           href: `/category/${category.id}`,
//           id: category.id,
//           subLinks: category.children
//             ? category.children.map((subCategory) => ({
//                 href: `/category/${subCategory.id}`,
//                 label: subCategory.name,
//                 id: subCategory.id,
//               }))
//             : [],
//         }));

//         setNavItems(transformedItems);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setNavItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const controlNavbar = () => {
//     if (typeof window !== "undefined") {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setShow(false);
//       } else {
//         setShow(true);
//       }
//       setLastScrollY(currentScrollY);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.addEventListener("scroll", controlNavbar);
//       return () => {
//         window.removeEventListener("scroll", controlNavbar);
//       };
//     }
//   }, [lastScrollY]);

//   if (!show) return null;

//   return (
//     <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6">
//       {/* Logo (Bigger Size) */}
//       <Link href="/" className="flex items-center">
//         <img
//           src="/images/logo5.png"
//           alt="Logo"
//           className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain transition-all"
//         />
//       </Link>

//       {/* Desktop Navbar (aligned right) */}
//       <nav className="hidden md:flex items-center rounded-full bg-white/25 backdrop-blur-md shadow-sm px-6 py-3 gap-6 ml-auto">
//         {/* Nav Links with Dropdowns */}
//         <div className="flex items-center gap-4 text-sm lg:text-base font-semibold tracking-wide text-[#3b3323]">
//           {loading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-[#A0937D] border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-sm">Loading...</span>
//             </div>
//           ) : (
//             navItems.map(({ label, href, id, subLinks }) => (
//               <div key={id} className="relative">
//                 <button
//                   onClick={() =>
//                     setOpenDropdown(openDropdown === id ? null : id)
//                   }
//                   className={`px-3 py-2 rounded-full flex items-center gap-1 whitespace-nowrap transition-colors duration-150 ${
//                     isActive(href)
//                       ? "bg-[#F6E6CB]/80 text-[#A0937D] shadow"
//                       : "hover:bg-[#A0937D]/70 hover:text-white"
//                   }`}
//                 >
//                   {label}
//                   {subLinks && subLinks.length > 0 && (
//                     <ChevronDown
//                       size={16}
//                       className={`transition-transform duration-300 ${
//                         openDropdown === id ? "rotate-180" : ""
//                       }`}
//                     />
//                   )}
//                 </button>

//                 {/* Dropdown */}
//                 {openDropdown === id && subLinks && subLinks.length > 0 && (
//                   <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E7D4B5] py-3 flex flex-col z-50">
//                     {subLinks.map(({ href, label, id: subId }) => (
//                       <Link
//                         key={subId}
//                         href={href}
//                         onClick={() => setOpenDropdown(null)}
//                         className="px-4 py-2 text-sm hover:bg-[#F6E6CB]/60 hover:text-[#A0937D] transition rounded-md"
//                       >
//                         {label}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Search Icon Only */}
//         <div className="flex items-center gap-3 ml-3">
//           <div className="relative">
//             <Search
//               className="cursor-pointer text-[#3b3323] hover:text-[#A0937D]"
//               size={22}
//               onClick={() => setSearchOpen(!searchOpen)}
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className={`absolute right-0 top-9 transition-all duration-300 bg-white/90 text-[#3b3323] rounded-md px-3 py-2 shadow-md ${
//                 searchOpen
//                   ? "w-40 sm:w-48 opacity-100"
//                   : "w-0 opacity-0 overflow-hidden"
//               }`}
//               suppressHydrationWarning
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Navbar */}
//       <div className="md:hidden flex items-center gap-4 ml-auto">
//         <Search
//           className="cursor-pointer text-[#3b3323] hover:text-[#A0937D]"
//           size={22}
//           onClick={() => setSearchOpen(!searchOpen)}
//         />
//         <button
//           className="focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           {menuOpen ? (
//             <X className="text-[#3b3323]" size={26} />
//           ) : (
//             <Menu className="text-[#3b3323]" size={26} />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-20 left-4 right-4 bg-white/95 shadow-md rounded-2xl p-6 flex flex-col gap-4 text-[#3b3323] font-semibold md:hidden z-40">
//           {loading ? (
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 border-2 border-[#A0937D] border-t-transparent rounded-full animate-spin"></div>
//               <span className="text-sm">Loading categories...</span>
//             </div>
//           ) : (
//             navItems.map(({ label, href, id }) => (
//               <Link
//                 key={id}
//                 href={href}
//                 className="px-4 py-2 rounded-md hover:bg-[#A0937D]/70 hover:text-white"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {label}
//               </Link>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = (path) => pathname === path;

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories/tree/hierarchy`
        );
        const categories = await response.json();

        const transformedItems = categories.map((category) => ({
          label: category.name,
          href: `/category/${category.id}`,
          id: category.id,
          subLinks: category.children
            ? category.children.map((subCategory) => ({
                href: `/category/${subCategory.id}`,
                label: subCategory.name,
                id: subCategory.id,
              }))
            : [],
        }));

        setNavItems(transformedItems);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setNavItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const toggleMobileCategory = (categoryId) => {
    setMobileOpenCategory(mobileOpenCategory === categoryId ? null : categoryId);
  };

  // Handle search - update URL params without navigation
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (query) {
      // Create new URLSearchParams from current params
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', query);
      
      // Update URL without navigation
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      // If empty, remove search param
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.push(newUrl, { scroll: false });
    }
    
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Handle search on Enter key
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src="/images/logo5.png"
          alt="Logo"
          className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain transition-all"
        />
      </Link>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center rounded-full bg-white/25 backdrop-blur-md shadow-sm px-6 py-3 gap-6 ml-auto">
        <div className="flex items-center gap-4 text-sm lg:text-base font-semibold tracking-wide text-[#3b3323]">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#A0937D] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            navItems.map(({ label, href, id, subLinks }) => (
              <div key={id} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === id ? null : id)
                  }
                  className={`px-3 py-2 rounded-full flex items-center gap-1 whitespace-nowrap transition-colors duration-150 ${
                    isActive(href)
                      ? "bg-[#F6E6CB]/80 text-[#A0937D] shadow"
                      : "hover:bg-[#A0937D]/70 hover:text-white"
                  }`}
                >
                  {label}
                  {subLinks && subLinks.length > 0 && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        openDropdown === id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {openDropdown === id && subLinks && subLinks.length > 0 && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E7D4B5] py-3 flex flex-col z-50">
                    {subLinks.map(({ href, label, id: subId }) => (
                      <Link
                        key={subId}
                        href={href}
                        onClick={() => setOpenDropdown(null)}
                        className="px-4 py-2 text-sm hover:bg-[#F6E6CB]/60 hover:text-[#A0937D] transition rounded-md"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Desktop Search */}
        <div className="flex items-center gap-3 ml-3">
          <div className="relative">
            <Search
              className="cursor-pointer text-[#3b3323] hover:text-[#A0937D]"
              size={22}
              onClick={() => setSearchOpen(!searchOpen)}
            />
            {searchOpen && (
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onBlur={() => {
                  setTimeout(() => setSearchOpen(false), 200);
                }}
                autoFocus
                className="absolute right-0 top-9 w-48 bg-white/90 text-[#3b3323] rounded-md px-3 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#A0937D]"
              />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center gap-4 ml-auto">
        <Search
          className="cursor-pointer text-[#3b3323] hover:text-[#A0937D]"
          size={22}
          onClick={() => setSearchOpen(!searchOpen)}
        />
        <button
          className="focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <X className="text-[#3b3323]" size={26} />
          ) : (
            <Menu className="text-[#3b3323]" size={26} />
          )}
        </button>
      </div>

      {/* Mobile Search Input */}
      {searchOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white shadow-md rounded-xl p-4 md:hidden z-40">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0937D] text-[#3b3323]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#A0937D] text-white rounded-lg hover:bg-[#8a7d6b] transition font-medium"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white/95 shadow-md rounded-2xl p-6 flex flex-col gap-2 text-[#3b3323] font-semibold md:hidden z-40 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#A0937D] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading categories...</span>
            </div>
          ) : (
            navItems.map(({ label, href, id, subLinks }) => (
              <div key={id} className="border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={href}
                    className="flex-1 px-4 py-3 rounded-md hover:bg-[#A0937D]/70 hover:text-white transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                  
                  {subLinks && subLinks.length > 0 && (
                    <button
                      onClick={() => toggleMobileCategory(id)}
                      className="px-3 py-3 hover:bg-gray-100 rounded-md transition"
                      aria-label={`Toggle ${label} submenu`}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          mobileOpenCategory === id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {mobileOpenCategory === id && subLinks && subLinks.length > 0 && (
                  <div className="pl-6 pr-4 pb-2 space-y-1 bg-[#F6E6CB]/30 rounded-md mt-1">
                    {subLinks.map(({ href, label, id: subId }) => (
                      <Link
                        key={subId}
                        href={href}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-[#A0937D]/50 hover:text-white transition"
                        onClick={() => {
                          setMenuOpen(false);
                          setMobileOpenCategory(null);
                        }}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}


