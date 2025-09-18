import React from 'react'
import { recipeData } from '../_lib'
import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";
import { notFound } from 'next/navigation';

const getData = async () => {
const res= await fetch("http://localhost:3000/api/foodItem",{cache:"no-store"})
if(!res.ok) return notFound()
return res.json()
}

const FoodItems = async () => {
 const foodItems=  await getData();
  return (
 <>
 <div className="grid justify-center items-center gap-4 col-span-4">
        {foodItems.map((item) => (
           <>
              <div key={item._id} className="flex border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl col-span-4 h-[340px] w-full">
                 <div className="w-1/2 flex flex-col justify-center items-start mt-10 text-white p-3">
                    <h4 className="mb-4 text-lg text-[#BCA067] font-sm">{item.type}</h4>
                    <div className="flex gap-5 mb-5 ml-2 w-full">

                       <div className="flex  justify-between items-center gap-2 text-[12px] font-medium">
                          <CiAlarmOn className=" text-[#BCA067]" />
                          <span>{item.time}</span>
                       </div>
                       <div className="flex justify-between items-center gap-2 text-[12px] font-medium ">
                          <BiDish className="text-[#BCA067]" />
                          <span>{item.people}</span>
                       </div>
                       <div className="flex justify-between items-center gap-2 text-[10px] font-medium">
                          <FaRegThumbsUp className="text-[#BCA067]" />
                          <span>{item.level} </span>
                       </div>



                    </div>
                    <h2 className="mb-4 ml-2 text-[26px] font-extrabold w-full inline-block playfair-display">{item.title}</h2>
                    <p className="mb-4 ml-2 text-[15px] max-w-[340px] montserrat text-white/90">{item.desc}</p>
                 </div>
                 <div className="w-1/2 my-5 mr-5 ml-0 rounded-3xl overflow-hidden border-2 border-[#BCA067]">
                    <img src={item.imgSrc} alt={item.title} className="w-[100%] h-[100%] object-cover" />
                 </div>

              </div>


           </>

        )
        )}

     </div>
     
        </>     
   
  )
}

export default FoodItems