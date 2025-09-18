import React from 'react'
import { notFound } from 'next/navigation'



const getData = async () => {
const res= await fetch("http://localhost:3000/api/recipeCard",{cache:"no-store"})
if(!res.ok) return notFound()
return res.json()
}


const RecipeImage =async () => {
   const recipeCard=  await getData();
  return (
    <div className='flex gap-y-8 flex-wrap justify-between '>
      {recipeCard.map((item) =>(
        <div key={item._d} className='border-t-2 border-b-4 border-x-2 border-white rounded-3xl h-[210px] w-[210px] overflow-hidden relative'>
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