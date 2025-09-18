import Nav from "./components/Nav"
import RecipeImage from "./components/RecipeImage"
import RecipeCard from "./components/RecipeCard";
import FoodItems from "./components/FoodItems";
import AboutCook from "./components/AboutCook";
import BookRec from "./components/BookRec";
import Newsletter from "./components/Newsletter";
import PopularRecipe from "./components/PopularRecipe";
import Categories from "./components/Categories";
import NewComp from "./components/NewComp";
const page = () => {
  const recipeInfo={
    type:"Vegetarian",
    time:"20 MINUTES",
    people:"2 PEOPLE",
    level:"EASY",
    title:"Caprese Stuffed Portobello Mushrooms",
    desc:"Meaty portbello mushrooms stuffed with fresh tomatoes, mozzarella,and basil for a flavourful vegetarian dish.",
    img:"https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977155/vegeterian_sbb9u7.avif"
  }
  return (
    <>
    <section className="mt-10 ">
     
     <RecipeCard {...recipeInfo}/>
    </section>
    <section className="mt-10">
      <RecipeImage />
    </section>
    <section className="mt-10">
      <div className="grid md:grid-cols-6 gap-6 place-content-center  container overflow-x-hidden w-full mx-auto h-auto">
         <div className="flex flex-col justify-center items-center gap-4 col-span-4 ">
          <FoodItems />
          <button className="mt-6 px-6 py-3 border-t-2 border-b-4 border-x-2 border-[#BCA067] text-[#BCA067] rounded-2xl shadow-md hover:bg-[#a78a5e] transition">
        Load More Recipes
      </button>
         </div>  
        <div className="flex flex-col place-content-start   md:col-span-2   gap-6  ">
         <AboutCook />
         <BookRec />
         <Newsletter/>
         <PopularRecipe />
         <Categories/>
         
        </div>
      </div>
    </section>
    </>

  )
}

export default page