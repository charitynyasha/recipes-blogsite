import React from "react";
import { notFound } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/videoRecipe", {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  return res.json();
};

const VideoRecipe = async () => {
  const VideoRecipe = await getData();
  return (
    <>
      {VideoRecipe.map((item) => (
        <div
          className="border-t-2 border-b-4 border-x-2 border-[#BCA067] flex flex-col p-4 w-[320px] h-[360px] rounded-2xl"
          key={item._id}
        >
          <div className=" h-[180px] w-full flex items-center justify-center relative">
            <img
              src={item.imgSrc}
              alt={item.title}
              className=" object-cover h-full w-full border-2 border-[#BCA067] rounded-2xl "
            />
            <FaPlayCircle className="absolute h-10 w-10 text-[#BCA067]" />
          </div>

          <h4 className="mb-4 mt-5 text-[12px] text-[#BCA067] font-sm flex items-start">
            {item.type}
          </h4>
          <h2 className=" playfair-display text-white text-2xl items-start flex max-w-[170px] font-bold">
            {item.title}
          </h2>
        </div>
      ))}
    </>
  );
};

export default VideoRecipe;
