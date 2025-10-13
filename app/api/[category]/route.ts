import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import { Model } from "mongoose";

// Import all your models
import recipeBread from "@/models/recipeBread";
import recipeAppetizer from "@/models/recipeAppetizer";
import recipeBreakfast from "@/models/recipeBreakfast";
// Import other models as needed
// import recipeDessert from "@/models/recipeDessert";
// import recipeMain from "@/models/recipeMain";

// Map category names to models
const modelMap: { [key: string]: typeof Model } = {
  bread: recipeBread,
  appetizer: recipeAppetizer,
  breakfast: recipeBreakfast,
  // Add other categories as you create them
  // desserts: recipeDessert,
  // "main-courses": recipeMain,
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const params = await context.params;
    const category = params.category;
    
    await connectDB();
    
    // Get the appropriate model based on category
    const Model = modelMap[category];
    
    if (!Model) {
      return new NextResponse(
        JSON.stringify({ error: `Category '${category}' not found` }),
        { status: 404 }
      );
    }
    
    const items = await Model.find({});
    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return new NextResponse(
      JSON.stringify({ error: "Couldn't fetch data: " + error }),
      { status: 500 }
    );
  }
}