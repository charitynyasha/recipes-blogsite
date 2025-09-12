import React from 'react'

const Newsletter = () => {
  return (
    <div className='border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl h-[300px] p-4 flex flex-col items-center justify-center text-center '>
         <h2 className='text-white text-2xl mb-5 font-extrabold playfair-display'>Subscribe To Weekly Newsletter</h2>
         <p className='text-white/90 montserrat text-[15px] mt-2'>Subscribe for a weekly dose of inspiration - the latest recipes,kitchen stories, and a sprinkle of culinary joy,delivered to your inbox</p>
         <div className='flex border-2 border-[#BCA067] text-white rounded-lg mt-5 relative w-full'>
            <input type="email" placeholder='Your Email'  className=' p-2 outline-none placeholder:text-white/90 montserrat text-[15px]'/>
            <button className='bg-[#BCA067] text-black/90 py-2 px-6 rounded-lg absolute -right-1 montserrat text-[15px]'>Subscribe</button>
         </div>
    </div>
  )
}

export default Newsletter