"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#A0937D] text-[#F6E6CB] pt-10 pb-6 mt-10 relative overflow-hidden text-base">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E7D4B5]/40 via-[#A0937D] to-[#A0937D]" />

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        
        {/* 🌟 Logo & Social */}
        <div>
          <div className="flex justify-center sm:justify-start mb-4">
            <Image src="/images/logo5.png" alt="furniq" width={120} height={45} />
          </div>
          <p className="text-sm text-[#F6E6CB]/80 italic mb-4">
            The Art of Better Living
          </p>
          <div className="flex justify-center sm:justify-start gap-5 text-[#F6E6CB]">
            <a href="#" className="hover:text-[#E3CDC8] transition transform hover:scale-110"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-[#E3CDC8] transition transform hover:scale-110"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-[#E3CDC8] transition transform hover:scale-110"><FaPinterestP size={18} /></a>
            <a href="#" className="hover:text-[#E3CDC8] transition transform hover:scale-110"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* 🌟 Customer Service */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white border-b border-[#E7D4B5] pb-1">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-[#F6E6CB]">
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Cancellation Policy</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Service Assurance / Warranty</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">FAQ</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* 🌟 About Us */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white border-b border-[#E7D4B5] pb-1">
            About HomeTown
          </h3>
          <ul className="space-y-2 text-sm text-[#F6E6CB]">
            <li><a href="#" className="hover:text-[#E3CDC8] transition">About Us</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Partner with Us</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Corporate Website</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Store Locator</a></li>
            <li><a href="#" className="hover:text-[#E3CDC8] transition">Sitemap</a></li>
          </ul>
        </div>

        {/* 🌟 Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-white border-b border-[#E7D4B5] pb-1">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-[#F6E6CB]">
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="text-[#E7D4B5]" size={16} />
              <span>care@hometown.in</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="text-[#F6E6CB]" size={16} />
              <span>08069252525 (10AM - 7PM)</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2">
              <MapPin className="text-[#E7D4B5]" size={16} />
              <span>Store Locator</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 🌟 Newsletter */}
      <div className="relative max-w-sm mx-auto mt-10 bg-[#E7D4B5] rounded-lg shadow-md p-5 text-center">
        <h3 className="text-[#1F1B16] text-lg font-semibold mb-2">Subscribe Now!</h3>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:flex-1 px-3 py-2 rounded-md text-gray-900 focus:outline-none shadow-sm text-sm"
            suppressHydrationWarning
          />
          <button
            type="submit"
            className="bg-[#A0937D] text-white px-5 py-2 rounded-md hover:bg-[#8B7F6C] transition w-full sm:w-auto text-sm shadow"
            suppressHydrationWarning
          >
            Subscribe →
          </button>
        </form>
        <p className="text-xs text-[#6B5E4F] mt-2">
          Join our VIP list for inspiration & updates.
        </p>
      </div>

      {/* 🌟 Locations */}
      <div className="relative max-w-4xl mx-auto text-center mt-8 text-sm text-[#F6E6CB] px-2">
        <p className="font-semibold text-white mb-1 text-base tracking-wide">Locations</p>
        <p className="leading-relaxed">
          Aurangabad | Ahmedabad | Bhubaneswar | Guwahati | Hyderabad | Kolkata | Lucknow | Nagpur | Nashik | Patna | Pune | Raipur | Siliguri | Visakhapatnam
        </p>
      </div>

      {/* 🌟 Bottom Links */}
      <div className="relative border-t border-[#E7D4B5]/30 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#F6E6CB] max-w-7xl mx-auto px-4 text-center sm:text-left">
        <p>© 2025 HT Interiors</p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <a href="#" className="hover:text-[#E3CDC8] transition">Terms</a>
          <a href="#" className="hover:text-[#E3CDC8] transition">Privacy</a>
          <a href="#" className="hover:text-[#E3CDC8] transition">Refund</a>
          <a href="#" className="hover:text-[#E3CDC8] transition">Shipping</a>
          <a href="#" className="hover:text-[#E3CDC8] transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}