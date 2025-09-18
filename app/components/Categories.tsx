import React from 'react'
import { categories } from '../_lib'

const Categories = () => {
  return (
    <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-2xl p-4 flex justify-center items-center flex-col gap-4'>
            <h2 className='text-white text-2xl mb-5 font-extrabold playfair-display text-center mt-4'>CATEGORIES</h2>

           <div className='flex flex-wrap justify-center items-center gap-4'>
              {categories.map((category,index) =>(
                    <button key={index} className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-2xl p-2'>
                    <p className='text-white montserrat text-[9.5px] font-extrabold'>{category}</p>
                    </button>
                ))}
           </div>
               
           
    </div>
  )
}

export default Categories