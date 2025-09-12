import React from 'react'
import { recipeData } from '../_lib'
import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";
const FoodItems = () => {
  return (
    <div className="grid justify-center items-center gap-4 col-span-4">
         {
          recipeData.map((item,index)=>(
            <>
               <div key={index} className="flex border-t-2 border-b-4 border-x-2 border-white rounded-3xl col-span-4 h-[340px] w-full">
                   <div className="w-1/2 flex flex-col justify-center items-start text-white p-4">
                      <h4 className="mb-5 text-lg text-[#BCA067] font-medium">{item.type}</h4>
                      <div className="flex gap-5 mb-5 ml-2 w-full">
                         
                               <div className="flex  justify-between items-center gap-2 text-[12px] font-medium" >
                                  <CiAlarmOn className=" text-[#BCA067]" />
                                  <span>{item.time}</span>
                               </div>
                               <div className="flex justify-between items-center gap-2 text-[12px] font-medium " >
                                  <BiDish className="text-[#BCA067]" />
                                  <span>{item.people}</span>
                               </div>
                               <div className="flex justify-between items-center gap-2 text-[12px] font-medium" >
                                    <FaRegThumbsUp className="text-[#BCA067]" />
                                    <span>{item.level} </span>
                               </div>
                         
           
           
                      </div>
                    <h2 className="mb-5 ml-2 text-[30px] font-extrabold w-full inline-block playfair-display">{item.title}</h2>
                   <p className="mb-5 ml-2 text-[15px] max-w-[340px] montserrat text-white/90">{item.desc}</p>
                   </div>
                   <div className="w-1/2 my-10 mr-10 ml-0 rounded-3xl overflow-hidden border-2 border-white">
                      <img src={item.img} alt={item.title} className="w-[100%] h-[100%] object-cover" />
                   </div>
                </div>
           
                
                   </>
               
          )
         )}
    </div>
  )
}

export default FoodItems