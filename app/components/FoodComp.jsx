import React from 'react';
import Image from 'next/image';
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight, PiPinterestLogo } from "react-icons/pi";
import { cookBooks } from '../_lib'
import { popularRecipes } from '../_lib'
import { categories } from '../_lib'
const AboutCook = ({styles}) => {
  return (
    <div className={`${styles} flex  flex-col gap-4`}>
    
    <div className="flex flex-col border-t-2 border-b-4 border-x-2 border-[#BCA067]  rounded-3xl items-center justify-start p-4 ">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-[#BCA067] relative">
              <Image
                  src="https://res.cloudinary.com/dxcmuocjm/image/upload/v1757417362/cook_nvtynz.avif"
                  alt="cook-image"
                  fill
                  className="object-cover object-center rounded-full"
                  priority />
          </div>
          <h3 className="text-white text-3xl mt-10 playfair-display">John Andra</h3>
          <p className="text-white/90 montserrat text-center">
              Let’s find a new way to think about the entire taxonomy of solar system objects, and not clutch to this concept
          </p>
          <div className="flex gap-4 mt-4">
              <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-full p-1">
                  <FaInstagram className="text-lg text-white bg-transparent" />
              </div>
              <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-full p-1">
                  <PiYoutubeLogoLight className="text-lg font-semibold text-white bg-transparent" />
              </div>
              <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-full p-1">
                  <PiPinterestLogo className="text-lg font-semibold text-white bg-transparent" />
              </div>
          </div>
      </div><div className='flex flex-col border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl p-4 overflow-hidden '>
              <h2 className='text-white text-center text-2xl mb-5 font-extrabold playfair-display'>COOKBOOKS</h2>
              {cookBooks.map((book, index) => (
                  <div key={index} className='flex  justify-center mb-8 items-center gap-4'>
                      <div className='w-[120px] h-[120px]'>
                          <img src={book.imgSrc} alt={book.title} className='w-full h-full object-center object-contain' />
                      </div>

                      <div>
                          <h3 className='font-bold text-white'>{book.title}</h3>
                          <p className='text-sm text-white/90'>{book.desc}</p>
                      </div>
                  </div>
              ))}
          </div>
          <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl  p-4 flex flex-col items-center justify-center text-center '>
         <h2 className='text-white text-2xl mb-5 font-extrabold playfair-display'>Subscribe To Weekly Newsletter</h2>
         <p className='text-white/90 montserrat text-[15px] mt-2'>Subscribe for a weekly dose of inspiration - the latest recipes,kitchen stories, and a sprinkle of culinary joy,delivered to your inbox</p>
         <div className='flex border-2 border-[#BCA067] text-white rounded-lg mt-5 relative w-full'>
            <input type="email" placeholder='Your Email'  className=' p-2 outline-none placeholder:text-white/90 montserrat text-[15px]'/>
            <button className='bg-[#BCA067] text-black/90 py-2 px-6 rounded-lg absolute -right-1 montserrat text-[15px]'>Subscribe</button>
         </div>
    </div>
     <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl flex flex-col p-4'>
             <h2 className='text-white text-2xl mb-5 font-extrabold playfair-display text-center mt-4'>MOST POPULAR</h2>
             {popularRecipes.map((recipe,index) =>(
                <div key={index} className='flex my-4'>
                  {recipe.imgSrc}
                  <div className='flex flex-col ml-4'>
                     <h3 className='font-extrabold text-[#BCA067] text-[10px] montserrat'>{recipe.title}</h3>
                     <p className='text-sm text-white/90 text-[18px] text-semibold  playfair-display font-extrabold inline-block w-full '>{recipe.desc}</p>
                  </div>
                </div>
             ))}
        </div>
        <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-2xl p-2 flex justify-center items-center flex-col gap-4 h-[280px] w-full'>
                    <h2 className='text-white text-2xl mb-5 font-extrabold playfair-display text-center mt-4'>CATEGORIES</h2>
        
                   <div className='flex flex-wrap justify-center items-center gap-2 w-full container'>
                      {categories.map((category,index) =>(
                            <button key={index} className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-2xl p-2'>
                            <p className='text-white montserrat text-[9px] font-extrabold'>{category}</p>
                            </button>
                        ))}
                   </div>
                       
                   
            </div>
          </div>
  );
};

export default AboutCook;
