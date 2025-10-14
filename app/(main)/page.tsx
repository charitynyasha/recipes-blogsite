// app/page.tsx
import RecipeImage from "../components/RecipeImage";
import RecipeCard from "../components/RecipeCard";
import FoodItems from "../components/FoodItems";
import BlogCarousel from "../components/BlogCarousel";
import RefreshButton from "../components/RefreshButon";
import VideoRecipe from "../components/VideoRecipe";
import FoodComp from "../components/FoodComp";

// Use environment variable for base URL or fallback to localhost
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const getData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/foodItem`, {
      cache: "no-store"
    });
    
    if (!res.ok) {
      console.error(`Food items fetch failed with status: ${res.status}`);
      return []; // Return empty array instead of notFound()
    }
    
    return res.json();
  } catch (error) {
    console.error('Error in getData:', error);
    return []; // Return empty array instead of notFound()
  }
};

const getBlogPosts = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store"
    });
    
    if (!res.ok) {
      console.warn(`Blog posts fetch failed with status: ${res.status}`);
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

const Page = async () => {
  try {
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
      desc: "Meaty portobello mushrooms stuffed with fresh tomatoes, mozzarella, and basil for a flavourful vegetarian dish.",
      img: "https://res.cloudinary.com/dxcmuocjm/image/upload/v1756977155/vegeterian_sbb9u7.avif"
    };

    return (
      <>
        {/* Recipe Card Section */}
        <section className="mt-10">
          <RecipeCard {...recipeInfo} />
        </section>

        {/* Recipe Image Section */}
        <section className="mt-10">
          <RecipeImage />
        </section>

        {/* Main Content Grid */}
        <section className="mt-10">
          <div className="grid md:grid-cols-6 gap-6 container w-full mx-auto h-auto ">
            <div className="flex flex-col justify-center items-center gap-4 col-span-4">
              <FoodItems 
                initialFoodItems={foodItems}
                apiRoute="fooditems" 
                styles={""}             
              />
              <button className="mt-6 px-6 py-3 border-t-2 border-b-4 border-x-2 border-[#BCA067] text-[#BCA067] rounded-2xl shadow-md font-semibold text-[15px] hover:bg-[#BCA067] hover:text-white transition-all duration-300">
                SEE ALL RECIPES
              </button>
            </div>
            <div className="flex flex-col  place-content-start md:col-span-2 gap-6   h-auto">
             <FoodComp styles={`sticky top-10`}/>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
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

        {/* Video Recipes Section */}
        <section className="mt-16">
          <div className="border-t-2 border-b-4 border-x-2 border-[#BCA067] p-6 rounded-2xl">
            <h2 className="playfair-display text-white text-2xl">VIDEO RECIPES</h2>
          </div>
          <div className="flex flex-row justify-between gap-5 mt-10">
            <VideoRecipe/>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error in page component:', error);
    return (
      <div className="flex flex-col justify-center items-center min-h-96 text-white">
        <h2 className="text-2xl mb-4">Something went wrong</h2>
        <p className="text-white/70">Failed to load page content. Please refresh the page.</p>
        {/* Use client component for interactive button */}
        <RefreshButton />
      </div>
    );
  }
};

// Add this line to force dynamic rendering
export const dynamic = 'force-dynamic';

export default Page;