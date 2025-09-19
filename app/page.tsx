"use client";
import { useEffect, useState } from "react";
import RecipeImage from "./components/RecipeImage";
import RecipeCard from "./components/RecipeCard";
import FoodItems from "./components/FoodItems";
import AboutCook from "./components/AboutCook";
import BookRec from "./components/BookRec";
import Newsletter from "./components/Newsletter";
import PopularRecipe from "./components/PopularRecipe";
import Categories from "./components/Categories";


type BlogPost = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
};

const page = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Failed to load blogs", err));
  }, []);

  const recipeInfo = {
    type: "Vegetarian",
    time: "20 MINUTES",
    people: "2 PEOPLE",
    level: "EASY",
    title: "Caprese Stuffed Portobello Mushrooms",
    desc: "Meaty portbello mushrooms stuffed with fresh tomatoes, mozzarella,and basil for a flavourful vegetarian dish.",
    img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977155/vegeterian_sbb9u7.avif"
  };

  return (
    <>
      <section className="mt-10">
        <RecipeCard {...recipeInfo} />
      </section>

      <section className="mt-10">
        <RecipeImage />
      </section>

      {/* 📝 Blog Posts Section */}
      <section className="mt-10 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={blog.image || "https://via.placeholder.com/400x200"}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700 mb-2">{blog.content.slice(0, 120)}...</p>
              <p className="text-sm text-gray-500">By {blog.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="grid md:grid-cols-6 gap-6 container overflow-x-hidden w-full mx-auto h-auto">
          <div className="flex flex-col justify-center items-center gap-4 col-span-4">
            <FoodItems />
            <button className="mt-6 px-6 py-3 border-t-2 border-b-4 border-x-2 border-[#BCA067] text-[#BCA067] rounded-2xl shadow-md hover:bg-[#a78a5e] transition">
              Load More Recipes
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
    </>
  );
};

export default page;
