"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (query) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', query);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.push(newUrl, { scroll: false });
    }
    
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      {/* Desktop Search */}
      <div className="hidden md:flex items-center gap-3 ml-3">
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

      {/* Mobile Search */}
      <div className="md:hidden">
        <Search
          className="cursor-pointer text-[#3b3323] hover:text-[#A0937D]"
          size={22}
          onClick={() => setSearchOpen(!searchOpen)}
        />
        
        {searchOpen && (
          <div className="absolute top-20 left-4 right-4 bg-white shadow-md rounded-xl p-4 z-40">
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
      </div>
    </>
  );
}
