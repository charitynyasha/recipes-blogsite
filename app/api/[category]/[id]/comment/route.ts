import { NextRequest, NextResponse } from "next/server";
import mongoose, { Model, Document } from "mongoose";

// Import all your models
import recipeBread from "@/models/recipeBread";
import recipeAppetizer from "@/models/recipeAppetizer";
import recipeBreakfast from "@/models/recipeBreakfast";
// Import other models as needed

// Define the comment interface
interface IComment {
  username: string;
  text: string;
  timestamp: Date;
}

// Define the recipe document interface
interface IRecipe extends Document {
  comments: IComment[];
  save(): Promise<this>;
}

// Use mongoose's built-in Model type with your document interface
type RecipeModel = Model<IRecipe>;

// Map category names to models with proper typing
const modelMap: Record<string, RecipeModel> = {
  bread: recipeBread as RecipeModel,
  appetizer: recipeAppetizer as RecipeModel,
  breakfast: recipeBreakfast as RecipeModel,
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
    const { username, text } = body;
    
    if (!username || !text) {
      return NextResponse.json(
        { error: "Username and comment text are required" },
        { status: 400 }
      );
    }

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

    // Initialize comments array if it doesn't exist
    if (!Array.isArray(item.comments)) {
      item.comments = [];
    }

    // Create new comment
    const newComment: IComment = {
      username: username.trim(),
      text: text.trim(),
      timestamp: new Date()
    };

    // Add comment to the array
    item.comments.push(newComment);
    
    // Save the updated item
    await item.save();

    return NextResponse.json({ 
      success: true,
      comments: item.comments,
      message: "Comment added successfully"
    });
  } catch (error: unknown) {
    console.error("Error in Comment API:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { 
        error: "Failed to add comment", 
        details: errorMessage
      },
      { status: 500 }
    );
  }
}