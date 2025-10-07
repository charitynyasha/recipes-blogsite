// app/api/foodItem/[id]/like/route.ts
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

// Import your model - ADJUST THIS PATH to match your project structure
// Option 1: If model is in app/models/
import foodItem from "@/models/foodItem"
// Option 2: If model is in models/ at root
// import FoodItem from "@/models/foodItem"

// Ensure mongoose connection
async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB")
      return
    }
    
    const mongoUrl = process.env.MONGODB_URL
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables")
    }
    
    await mongoose.connect(mongoUrl)
    console.log("Successfully connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Wait for params in Next.js 15
    const params = await context.params
    const itemId = params.id
    
    console.log("=== Like API Called ===")
    console.log("Item ID:", itemId)
    
    // Connect to database
    await connectDB()
    
    // Parse request body
    const body = await request.json()
    const { action } = body
    console.log("Action:", action)
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      console.error("Invalid ObjectId:", itemId)
      return NextResponse.json(
        { error: "Invalid item ID format" },
        { status: 400 }
      )
    }

    // Find the item
    console.log("Finding item...")
    const item = await foodItem.findById(itemId)
    
    if (!item) {
      console.error("Item not found:", itemId)
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      )
    }

    console.log("Item found:", item.title)
    console.log("Current likes:", item.likes)

    // Initialize likes if it doesn't exist
    if (typeof item.likes !== 'number') {
      item.likes = 0
    }

    // Update likes based on action
    if (action === "like") {
      item.likes += 1
    } else if (action === "unlike") {
      item.likes = Math.max(0, item.likes - 1)
    } else {
      return NextResponse.json(
        { error: "Invalid action. Must be 'like' or 'unlike'" },
        { status: 400 }
      )
    }

    console.log("New likes count:", item.likes)
    
    // Save the updated item without running full validation
    // This prevents validation errors on other fields
    await item.save({ validateBeforeSave: false })
    console.log("Item saved successfully")

    return NextResponse.json({ 
      success: true,
      likes: item.likes,
      message: action === "like" ? "Liked successfully" : "Unliked successfully"
    })
  } catch (error) {
    console.error("=== ERROR in Like API ===")
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Full error:", error)
    
    return NextResponse.json(
      { 
        error: "Failed to update like", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}