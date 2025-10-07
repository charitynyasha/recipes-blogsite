import React from "react";
import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";
const RecipeCard = ({ type,time,people,level, title, desc, img }) => {
  return (
    <>
    <div className="flex border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl">
        <div className="w-1/2 flex flex-col justify-center items-start text-white p-4">
           <h4 className="mb-5 text-lg text-[#BCA067] font-medium">{type}</h4>
           <div className="flex gap-10 mb-5 ml-2 w-full">
              
                    <div className="flex justify-between items-center gap-2 text-[12px] font-medium" >
                       <CiAlarmOn className=" text-[#BCA067]" />
                       <span>{time}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-[12px] font-medium" >
                       <BiDish className="text-[#BCA067]" />
                       <span>{people}</span>
                    </div>
                    <div className="flex justify-between items-center gap-2 text-[12px] font-medium" >
                         <FaRegThumbsUp className="text-[#BCA067]" />
                         <span>{level} </span>
                    </div>
              


           </div>
         <h2 className="mb-5 ml-2 text-[25px] font-bold w-full inline-block">{title}</h2>
        <p className="mb-5 ml-2 text-sm max-w-[440px]">{desc}</p>
        </div>
        <div className="w-1/2 my-10 mr-10 ml-0 rounded-3xl overflow-hidden border-2 border-white">
           <img src={img} alt={title} className="w-[100%] h-[100%] object-cover" />
        </div>
     </div>

     
        </>
    
  );
};

export default RecipeCard;
