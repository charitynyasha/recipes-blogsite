import FoodItems from "@/app/components/FoodItems";
import RecipeBanner from "@/app/components/RecipeBanner";
import React from "react";
import FoodComp from "@/app/components/FoodComp";
const page = () => {
  return (
    <>
      <section className="mt-10 flex items-center justify-center w-full">
        <RecipeBanner
          category={"BREAD"}
          description={
            "Discover delightful homemade recipes that add warmth to your kitchen. From savory to sweet, our easy bread creations make baking a joy for all."
          }
        />
      </section>
      <section className="mt-10">
        <div className="grid md:grid-cols-6 gap-6 container w-full mx-auto h-auto ">
          <div className="flex flex-col place-content-start items-center gap-4 col-span-4">
            <FoodItems 
            initialFoodItems={[]} 
            apiRoute="bread"
            styles={`sticky top-10`}
             />
          </div>
          <div className="flex flex-col  place-content-start md:col-span-2 gap-6  ">
            <FoodComp styles={undefined}            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
