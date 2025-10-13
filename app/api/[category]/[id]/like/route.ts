import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// Import all your models
import recipeBread from "@/models/recipeBread";
import recipeAppetizer from "@/models/recipeAppetizer";
import recipeBreakfast from "@/models/recipeBreakfast";
// Import other models as needed

// Use mongoose's Model type
type RecipeModel = typeof mongoose.Model;

// Map category names to models with proper typing
const modelMap: Record<string, RecipeModel> = {
  bread: recipeBread,
  appetizer: recipeAppetizer,
  breakfast: recipeBreakfast,
  // Add other categories
};

// Ensure mongoose connection
async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const params = await context.params;
    const category = params.category;
    const itemId = params.id;
    
    await connectDB();
    
    // Get the appropriate model
    const Model = modelMap[category];
    
    if (!Model) {
      return NextResponse.json(
        { error: `Category '${category}' not found` },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    const { action } = body;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return NextResponse.json(
        { error: "Invalid item ID format" },
        { status: 400 }
      );
    }

    const item = await Model.findById(itemId);
    
    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // Initialize likes if it doesn't exist
    if (typeof item.likes !== 'number') {
      item.likes = 0;
    }

    // Update likes based on action
    if (action === "like") {
      item.likes += 1;
    } else if (action === "unlike") {
      item.likes = Math.max(0, item.likes - 1);
    } else {
      return NextResponse.json(
        { error: "Invalid action. Must be 'like' or 'unlike'" },
        { status: 400 }
      );
    }
    
    await item.save({ validateBeforeSave: false });

    return NextResponse.json({ 
      success: true,
      likes: item.likes,
      message: action === "like" ? "Liked successfully" : "Unliked successfully"
    });
  } catch (error: unknown) {
    console.error("Error in Like API:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { 
        error: "Failed to update like", 
        details: errorMessage
      },
      { status: 500 }
    );
  }
}