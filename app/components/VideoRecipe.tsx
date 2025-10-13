// app/components/VideoRecipe.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";

interface VideoRecipeItem {
  _id: string;
  imgSrc: string;
  title: string;
  type: string;
}

const VideoRecipe = () => {
  const [videoRecipes, setVideoRecipes] = useState<VideoRecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/videoRecipe", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setVideoRecipes(data);
      } catch (err) {
        console.error("Error fetching video recipes:", err);
        setError("Failed to load video recipes.");
        setVideoRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-row justify-between gap-5 mt-10">
        {[1, 2, 3].map((item) => (
          <div
            className="border-t-2 border-b-4 border-x-2 border-[#BCA067] flex flex-col p-4 w-[320px] h-[360px] rounded-2xl"
            key={item}
          >
            <div className="h-[180px] w-full bg-gray-700 rounded-2xl animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded mt-5 animate-pulse"></div>
            <div className="h-6 bg-gray-700 rounded mt-3 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center py-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {videoRecipes.map((item) => (
        <div
          className="border-t-2 border-b-4 border-x-2 border-[#BCA067] flex flex-col p-4 w-[320px] h-[360px] rounded-2xl"
          key={item._id}
        >
          <div className=" h-[180px] w-full flex items-center justify-center relative">
            <Image
              src={item.imgSrc}
              alt={item.title}
              layout="fill"
              className="object-cover border-2 border-[#BCA067] rounded-2xl"
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
