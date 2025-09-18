"use client"
import { IoIosArrowDown } from "react-icons/io";
import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight,PiPinterestLogo } from "react-icons/pi";
import { CiLight } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { navSkills } from "../_lib";
import { useState } from 'react';
import Link from 'next/link';
const Nav = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const handleMouseEnter = (index: number) => {
    // Handle mouse enter event
    setActiveDropdown(index);
  };
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  }; 
  return (
    <>
       <section className='flex justify-between items-center '>
      <div className='flex gap-4'>
         <FaInstagram className='text-lg text-white bg-transparent'/>
         <PiYoutubeLogoLight className='text-lg font-semibold text-white bg-transparent'/>
         <PiPinterestLogo className='text-lg font-semibold text-white bg-transparent'/>
      </div>
      <div><h1 className='playball-regular text-white text-3xl'>Flavourist</h1></div>
       <div className='flex gap-4'>
         <CiLight className='text-lg text-white bg-transparent font-semibold'/>
         <CiSearch className='text-lg text-white bg-transparent font-semibold'/>
         <Link href="/signIn">
          <IoPerson className='text-lg text-white bg-transparent font-semibold' />
         </Link>
        
      </div>
    </section>
    <section className='border-t-2 border-b-4 border-x-2 border-white mt-4 p-6 rounded-3xl flex justify-center items-center '>
       
       <ul className="flex justify-center items-center gap-8 text-lg  text-white">
           {navSkills.map((link) => (
          <>
          <li
          className="relative"
          key={link.id}>
            
          
          <div 
          
          onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.id)}
          onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
          className='flex justify-center items-center gap-1  cursor-pointer'
          >
            <Link 
            href={link.url}
            key={link.id}
            >{link.text}
            </Link>
            {link.hasDropdown && <IoIosArrowDown className={`transition-transform duration-300 ${activeDropdown === link.id ? "rotate-180" : ""}`} />}
          </div>
          {/* Dropdown Menu */}
          {link.hasDropdown && (
            <div className={` top-full border-t-2 border-b-4 border-x-2 border-white rounded-3xl absolute  bg-white text-black p-4 transform -translate-x-1/2 left-1/2 ${activeDropdown === link.id ? "block" : "hidden"}`}>
             <div className="py-2">
              {link.dropdownItems && link.dropdownItems.map((item) =>(
                    <Link key={item.id} href={item.url} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                      {item.text}
                    </Link>
                ))}
              
             </div>
         
        </div>
         )}
         </li>
        </>
      ))}
        </ul>   
     
   
  </section>
  </>

  )
}

export default Nav