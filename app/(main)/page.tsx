// app/page.tsx
import RecipeImage from "../components/RecipeImage";
import RecipeCard from "../components/RecipeCard";
import AboutCook from "../components/AboutCook";
import BookRec from "../components/BookRec";
import Newsletter from "../components/Newsletter";
import PopularRecipe from "../components/PopularRecipe";
import Categories from "../components/Categories";
import VideoRecipe from "../components/VideoRecipe";
import FoodItems from "../components/FoodItems";
import BlogCarousel from "../components/BlogCarousel";
import { notFound } from 'next/navigation';

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/foodItem", {
    cache: "no-store"
  });
  
  if (!res.ok) return notFound();
  
  return res.json();
};

const getBlogPosts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/blogs", {
      cache: "no-store"
    });
    
    if (!res.ok) return [];
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

const Page = async () => {
  const [foodItems, blogPosts] = await Promise.all([
    getData(),
    getBlogPosts()
  ]);

  const recipeInfo = {
    type: "Vegetarian",
    time: "20 MINUTES",
    people: "2 PEOPLE",
    level: "EASY",
    title: "Caprese Stuffed Portobello Mushrooms",
    desc: "Meaty portbello mushrooms stuffed with fresh tomatoes, mozzarella, and basil for a flavourful vegetarian dish.",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977155/vegeterian_sbb9u7.avif"
  };

  return (
    <>
      {/* ALL YOUR EXISTING SECTIONS - UNCHANGED */}
      <section className="mt-10">
        <RecipeCard {...recipeInfo} />
      </section>

      <section className="mt-10">
        <RecipeImage />
      </section>

      <section className="mt-10">
        <div className="grid md:grid-cols-6 gap-6 container overflow-x-hidden w-full mx-auto h-auto">
          <div className="flex flex-col justify-center items-center gap-4 col-span-4">
            <FoodItems initialFoodItems={foodItems} />
            <button className="mt-6 px-6 py-3 border-t-2 border-b-4 border-x-2 border-[#BCA067] text-[#BCA067] rounded-2xl shadow-md font-semibold text-[15px]">
              SEE ALL RECIPES
            </button>
          </div>
          <div className="flex flex-col place-content-start md:col-span-2 gap-6">
            <AboutCook />
            <BookRec />
            <Newsletter />
            <PopularRecipe />
            <Categories />
          </div>
        </div>
      </section>

      {/* NEW BLOG POSTS SECTION - ADDED BEFORE VIDEO RECIPE */}
      <section className="mt-16">
        <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] p-6 rounded-2xl mb-8">
          <h2 className="playfair-display text-white text-2xl">LATEST BLOG POSTS</h2>
          <p className="text-white/70 mt-2">Discover culinary stories, tips, and insights from our community</p>
        </div>
        
        <BlogCarousel posts={blogPosts} />
        
        {blogPosts.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-t-2 border-b-4 border-x-2 border-[#BCA067] text-[#BCA067] rounded-2xl shadow-md font-semibold text-[15px] hover:bg-[#BCA067] hover:text-white transition-all duration-300">
              VIEW ALL BLOG POSTS
            </button>
          </div>
        )}
      </section>

      {/* EXISTING VIDEO RECIPE SECTION - UNCHANGED */}
      <section className="mt-16">
        <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] p-6 rounded-2xl">
          <h2 className="playfair-display text-white text-2xl">VIDEO RECIPES</h2>
        </div>
        <div className="flex flex-row justify-between gap-5 mt-10">
          <VideoRecipe />
        </div>
      </section>
    </>
  );
};

export default Page;