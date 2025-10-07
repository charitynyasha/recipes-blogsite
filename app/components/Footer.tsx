import React from "react";
import { footerlinks } from "../_lib";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight, PiPinterestLogo } from "react-icons/pi";


const Footer = () => {
  return (
    <section className="mt-10">
      <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] p-4 rounded-2xl">
        <ul className="flex justify-center items-center w-full gap-5">
          {footerlinks.map((link) => (
            <li
              className="text-white text-[12px] font-bold uppercase montserrat "
              key={link.id}
            >
              <a href={link.url}>{link.link}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 mt-4 items-center justify-center">
          <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-full p-1">
            <FaInstagram className="text-lg text-[#BCA067] bg-transparent" />
          </div>
          <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-full p-1">
            <PiYoutubeLogoLight className="text-lg font-semibold text-[#BCA067] bg-transparent" />
          </div>
          <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-full p-1">
            <PiPinterestLogo className="text-lg font-semibold text-[#BCA067] bg-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
