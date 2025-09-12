import React from 'react'
import { popularRecipes } from '../_lib'

const PopularRecipe = () => {
  return (
    <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl flex flex-col p-4'>
         <h2 className='text-white text-2xl mb-5 font-extrabold playfair-display text-center mt-4'>MOST POPULAR</h2>
         {popularRecipes.map((recipe,index) =>(
            <div key={index} className='flex my-4'>
              {recipe.imgSrc}
              <div className='flex flex-col ml-4'>
                 <h3 className='font-extrabold text-[#BCA067] text-[10px] montserrat'>{recipe.title}</h3>
                 <p className='text-sm text-white/90 text-[15px] text-semibold  playfair-display font-extrabold inline-block w-full '>{recipe.desc}</p>
              </div>
            </div>
         ))}
    </div>
  )
}

export default PopularRecipe