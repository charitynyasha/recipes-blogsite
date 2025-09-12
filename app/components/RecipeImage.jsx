import React from 'react'
import { recipeImage } from '../_lib/index'

const RecipeImage = () => {
  return (
    <div className='flex items-center justify-center flex-wrap gap-4 '>
      {recipeImage.map((item,index) =>(
        <div key={index} className='border-t-2 border-b-4 border-x-2 border-white rounded-3xl h-[230px] w-[230px] overflow-hidden relative'>
          <img src={item.imgSrc} alt={item.title} className='w-full h-full'/>
          <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-center py-2 rounded-3xl'>
            <h4 className='text-white text-md'>{item.title}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeImage