"use client";
import React, { useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import { FaRegThumbsUp, FaPlayCircle } from "react-icons/fa";
import { useUserImpressionInteractions } from "@/hooks/useUserImpressionInteractions";

export default function FoodItemCard({ item, index }: { item: any; index: number }) {
  const { likesCount, comments, like, postComment, pending } =
    useUserImpressionInteractions(item);
  const [text, setText] = useState("");

  const showPlayButton = index === 3 || index === 5 || index === 7;

  return (
    <div className="flex flex-col md:flex-row border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl w-full gap-4 p-4 bg-[#1A1A1A]">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col justify-start gap-3 text-white">
        <h4 className="text-[#BCA067]">{item.type}</h4>

        <div className="flex gap-4 text-[12px] font-medium">
          <div className="flex items-center gap-1">
            <CiAlarmOn className="text-[#BCA067]" />
            <span>{item.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <BiDish className="text-[#BCA067]" />
            <span>{item.people}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegThumbsUp className="text-[#BCA067]" />
            <span>{likesCount}</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold playfair-display mt-2">
          {item.title}
        </h2>
        <p className="text-sm md:text-base text-white/90">{item.desc}</p>

        {/* Like Button */}
        <button
          onClick={like}
          className="mt-2 flex items-center gap-2 px-3 py-1 rounded-md border border-[#BCA067] text-[#BCA067] hover:bg-[#BCA067] hover:text-black transition w-max"
        >
          <FaRegThumbsUp /> Like
        </button>

        {/* Comment Section */}
        <div className="mt-3 w-full flex flex-col gap-2">
          <h4 className="font-semibold">Comments</h4>

          {/* Comment list with scroll if too long */}
          <ul className="text-sm max-h-32 overflow-y-auto space-y-1 pr-2">
            {comments.length === 0 ? (
              <li className="text-white/60">No comments yet</li>
            ) : (
              comments.map((c: any, i: number) => (
                <li key={i} className="text-white/90">
                  <span className="text-white/70">
                    {c.author ? `${c.author}: ` : ""}
                  </span>
                  {c.text}
                </li>
              ))
            )}
          </ul>

          {/* Input + Post button in flex row */}
          <div className="flex gap-2 mt-1">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-md p-2 text-black"
            />
            <button
              disabled={pending || !text.trim()}
              onClick={() => {
                postComment(text);
                setText("");
              }}
              className="px-3 py-2 rounded-md bg-[#BCA067] text-black disabled:opacity-60"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Right Side (Image + Play button) */}
      <div className="md:w-1/2 relative mt-4 md:mt-0 rounded-3xl overflow-hidden border-2 border-[#BCA067]">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="w-full h-64 md:h-full object-cover"
        />
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FaPlayCircle className="text-[#BCA067] text-6xl cursor-pointer drop-shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
