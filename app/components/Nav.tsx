"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight, PiPinterestLogo } from "react-icons/pi";
import { CiLight, CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { navSkills } from "../_lib";
import { useAuth } from "../context/AuthContext";
import { ModeToggle } from "./ThemeToggler";


const Nav = () => {
  const { user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
    // TODO: route to search results page or API call
    setIsSearchOpen(false);
  };

  return (
    <>
      <section className="flex justify-between items-center">
        <div className="flex gap-4">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener">
            <FaInstagram className="text-lg text-white bg-transparent" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener">
            <PiYoutubeLogoLight className="text-lg font-semibold text-white bg-transparent" />
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noopener">
            <PiPinterestLogo className="text-lg font-semibold text-white bg-transparent" />
          </a>
        </div>
        <div>
          <h1 className="playball-regular text-white text-3xl">Flavourist</h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <ModeToggle/>
          {/* Search Button */}
          <button onClick={() => setIsSearchOpen(true)}>
            <CiSearch className="text-lg text-white bg-transparent font-semibold" />
          </button>
          <div className="flex gap-4">
            {user ? (
              <Link href="/dashboard" className="p-4 rounded-2xl bg-[#BCA067] text-white text-[13px] montserrat font-bold flex items-center">
               Dashboard
              </Link>
            ) : (
              <Link href="/signIn" className="p-4 rounded-2xl bg-[#BCA067] text-white  text-[13px] montserrat font-bold flex items-center ">
               Sign In
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-b-4 border-x-2 border-gold mt-4 p-6 rounded-3xl flex justify-center items-center">
        <ul className="flex justify-center items-center gap-6 text-[15px] montserrat  text-white/90">
          {navSkills.map((link) => (
            <React.Fragment key={link.id}>
              <li className="relative">
                <div
                  onMouseEnter={() =>
                    link.hasDropdown && handleMouseEnter(link.id)
                  }
                  onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                  className="flex justify-center items-center gap-1 cursor-pointer"
                >
                  <Link href={link.url}>{link.text}</Link>
                  {link.hasDropdown && (
                    <IoIosArrowDown
                      className={`transition-transform duration-300 ${
                        activeDropdown === link.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {link.hasDropdown && (
                  <div
                    className={`top-full border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl absolute 
bg-[#1C1C1C] text-white p-2 transform -translate-x-1/2 left-1/2 px-4 py-2  ${
                      activeDropdown === link.id ? "block" : "hidden"
                    }`}
                  >
                    <div className="py-2">
                      {link.dropdownItems &&
                        link.dropdownItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.url}
                            
                          >
                            <p className="block  text-[13px] montserrat text-white/90 hover:bg-gray-100 mb-1.5 max-w-[560px] ">{item.text}</p>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </section>

      {/* --- SEARCH MODAL --- */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-transparent rounded-2xl w-1/3 md:w-1/2  p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex justify-center">
              <div className="relative w-full">
                {/* Search Icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <CiSearch className="text-lg text-[#BCA067] bg-transparent font-semibold" />
                </span>

                {/* Input */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-[#1C1C1C] shadow-md focus:outline-none focus:ring-2 focus:ring-[#BCA067] placeholder:text-white/90 placeholder:text-[12px] text-white"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;