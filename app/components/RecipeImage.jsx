import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getRecipeCards } from "@/lib/recipeCard";

const getData = async () => {
  try {
    return await getRecipeCards();
  } catch (e) {
    return notFound();
  }
};

const RecipeImage = async () => {
  const recipeCard = await getData();
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 items-center justify-center">
      {recipeCard.map((item) => (
        <div
          key={item._id}
          className="border-t-2 border-b-4 border-x-2 border-gold rounded-3xl h-[240px] w-[240px] overflow-hidden relative"
        >
          <Image
            src={item.imgSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, 240px"
            className="object-center object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-[#242322] bg-opacity-50 text-center py-2 rounded-3xl">
            <h4 className="text-white text-md text-small">{item.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeImage;
