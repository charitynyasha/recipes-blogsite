import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight,PiPinterestLogo } from "react-icons/pi";

const AboutCook = () => {
  return (
    <div className='flex flex-col border-t-2 border-b-4 border-x-2 border-white rounded-3xl items-center justify-start p-4 '>
       <div className='w-50 h-50 rounded-full overflow-hidden border-2 border-white'>
        <img src="https://res.cloudinary.com/dxcmuocjm/image/upload/v1757417362/cook_nvtynz.avif" alt="cook-image" className='w-full h-full object-cover object-center rounded-full' />
       </div>
       <h3 className='text-white text-3xl mt-10 playfair-display'>John Andra</h3>
       <p className='text-white/90 montserrat text-center'>Let’s find a new way to think about the entire taxonomy of solar system objects, and not clutch to this concept</p>
       <div className='flex gap-4 mt-4'>
        <div className='border-t-2 border-b-4 border-x-2 border-amber-400 rounded-full p-1'><FaInstagram className='text-lg text-white bg-transparent'/></div>
        <div className='border-t-2 border-b-4 border-x-2 border-amber-400 rounded-full p-1'><PiYoutubeLogoLight className='text-lg font-semibold text-white bg-transparent'/></div>
        <div className='border-t-2 border-b-4 border-x-2 border-amber-400 rounded-full p-1'><PiPinterestLogo className='text-lg font-semibold text-white bg-transparent'/></div>
       </div>
    </div>
  )
}

export default AboutCook