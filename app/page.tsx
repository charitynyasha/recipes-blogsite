import Nav from "./components/Nav"
import RecipeImage from "./components/RecipeImage"
import RecipeCard from "./components/RecipeCard";
import FoodItems from "./components/FoodItems";
import AboutCook from "./components/AboutCook";
import BookRec from "./components/BookRec";
import Newsletter from "./components/Newsletter";
import PopularRecipe from "./components/PopularRecipe";
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
    <Nav />
    <section className="mt-10 ">
      
     <RecipeCard {...recipeInfo}/>
    </section>
    <section className="mt-10">
      <RecipeImage />
    </section>
    <section className="mt-10">
      <div className="grid md:grid-cols-6 gap-6   container overflow-x-hidden w-full mx-auto">
      
          <FoodItems />
        
        <div className="flex flex-col place-content-start   md:col-span-2   gap-6  ">
         <AboutCook />
         <BookRec />
         <Newsletter/>
         <PopularRecipe />
        </div>
      </div>
    </section>
    </>

  )
}

export default page