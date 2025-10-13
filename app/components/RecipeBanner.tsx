import React from 'react'

interface RecipeBannerProps {
  category: string;
  description: string;
}

const RecipeBanner = ({ category, description }: RecipeBannerProps) => {
  return (
    <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] p-6 rounded-2xl flex flex-col justify-center text-center items-center w-full'>
      <h2 className='text-[#BCA067] text-lg montserrat mb-5 font-medium'>RECIPES</h2>
      <h4 className='playfair-display text-white text-7xl font-extrabold mb-5'>{category}</h4>
      <p className='mt-2 montserrat text-white/90 text-[17.5px]  text-center'>{description}</p>
    </div>
  )
}

export default RecipeBanner