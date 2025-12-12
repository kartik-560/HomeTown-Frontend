"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

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
        const limitedCategories = categories.slice(0, 6);

        const transformedItems = limitedCategories.map((category) => ({
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
                  className={`px-3 py-2 rounded-full flex items-center gap-1 whitespace-nowrap transition-colors duration-150 ${isActive(href)
                    ? "bg-[#F6E6CB]/80 text-[#A0937D] shadow"
                    : "hover:bg-[#A0937D]/70 hover:text-white"
                    }`}
                >
                  {label}
                  {subLinks && subLinks.length > 0 && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${openDropdown === id ? "rotate-180" : ""
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

        {/* Search with Suspense */}
        <Suspense fallback={<div className="w-6 h-6"></div>}>
          <SearchBar />
        </Suspense>
      </nav>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center gap-4 ml-auto">
        <Suspense fallback={<div className="w-6 h-6"></div>}>
          <SearchBar />
        </Suspense>
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
                        className={`transition-transform duration-300 ${mobileOpenCategory === id ? "rotate-180" : ""
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


