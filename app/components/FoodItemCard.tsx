"use client";
import React from "react";
import Image from "next/image";
import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { FaRegThumbsUp, FaThumbsUp, FaPlayCircle } from "react-icons/fa";
import { useUserImpressionInteractions } from "@/hooks/useUserImpressionInteractions";
import { FoodItem } from "@/types/food";

interface FoodItemCardProps {
  item: FoodItem;
  index: number;
}

export default function FoodItemCard({ item, index }: FoodItemCardProps) {
  // The Rules of Hooks state that hooks must be called at the top level
  // of your component, before any returns or conditions.
  const { isLiked, likesCount, comments, like, pending } =
    useUserImpressionInteractions(item as FoodItem & { _id: string });

  // This conditional return is placed *after* all hooks have been called,
  // which is the correct pattern. It acts as a guard to prevent rendering
  // a card with no ID.
  if (!item._id) {
    return null;
  }

  const showPlayButton = index === 3 || index === 5 || index === 7;

  return (
    <div className="flex flex-col border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl col-span-4 w-full">
      <div className="flex h-[340px] gap-6">
        <div className="w-1/2 flex flex-col justify-center items-start mt-10 text-white p-3">
          <div>
            <h4>{item.type}</h4>
          </div>
          <div className="flex gap-4 mb-5 ml-2 w-full">
            <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
              <CiAlarmOn className="text-[#BCA067]" />
              <span>{item.time}</span>
            </div>
            <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
              <BiDish className="text-[#BCA067]" />
              <span>{item.people}</span>
            </div>
            <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
              <FaRegThumbsUp className="text-[#BCA067]" />
              <span>{item.difficulty}</span>
            </div>
          </div>
          <h2 className="mb-4 ml-2 text-[30px] font-extrabold w-full inline-block playfair-display">
            {item.title}
          </h2>
          <p className="mb-4 ml-2 text-[16px] max-w-[340px] montserrat text-white/90">
            {item.desc}
          </p>
        </div>
        <div className="w-1/2 my-5 mr-5 ml-0 rounded-3xl overflow-hidden border-2 border-[#BCA067] relative">
          <Image
            src={item.imgSrc}
            alt={item.title}
            fill
            className="object-cover object-center"
          />
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaPlayCircle className="text-[#BCA067] text-6xl hover:opacity-100 transition-opacity cursor-pointer drop-shadow-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Social Interaction Section */}
      <div className="border-t border-[#BCA067]/30 px-6 py-2">
        <div className="flex items-center gap-6">
          <button
            onClick={like}
            disabled={pending}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all disabled:opacity-50 ${
              isLiked
                ? "text-[#BCA067] bg-[#BCA067]/10"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            {isLiked ? (
              <FaThumbsUp className="text-[18px]" />
            ) : (
              <FaRegThumbsUp className="text-[18px]" />
            )}
            <span className="text-sm font-medium">Like</span>
            <span className="text-sm font-medium">({likesCount})</span>
          </button>

          {/* This would typically open a modal */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70">
            <span className="text-sm font-medium">
              {comments.length} Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
