// app/api/foodItem/[id]/comment/route.ts
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

// Import your model - ADJUST THIS PATH to match your project structure
// Option 1: If model is in app/models/
import recipeBread from "@/models/recipeBread"
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
    
    console.log("=== Comment API Called ===")
    console.log("Item ID:", itemId)
    
    // Connect to database
    await connectDB()
    
    // Parse request body
    const body = await request.json()
    const { username, text } = body
    
    console.log("Username:", username)
    console.log("Comment text:", text)
    
    if (!username || !text) {
      return NextResponse.json(
        { error: "Username and comment text are required" },
        { status: 400 }
      )
    }

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
    const item = await recipeBread.findById(itemId)
    
    if (!item) {
      console.error("Item not found:", itemId)
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      )
    }

    console.log("Item found:", item.title)

    // Initialize comments array if it doesn't exist
    if (!Array.isArray(item.comments)) {
      item.comments = []
    }

    // Create new comment
    const newComment = {
      username: username.trim(),
      text: text.trim(),
      timestamp: new Date()
    }

    console.log("Adding comment:", newComment)

    // Add comment to the array
    item.comments.push(newComment)
    
    // Save the updated item
    await item.save()
    console.log("Comment added successfully")
    console.log("Total comments:", item.comments.length)

    return NextResponse.json({ 
      success: true,
      comments: item.comments,
      message: "Comment added successfully"
    })
  } catch (error) {
    console.error("=== ERROR in Comment API ===")
    console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Full error:", error)
    
    return NextResponse.json(
      { 
        error: "Failed to add comment", 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}