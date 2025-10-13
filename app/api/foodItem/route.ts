import { NextResponse } from "next/server";
import { getFoodItems } from "@/lib/data"; // We will create this function

export const GET = async () => {
  try {
    const foodItems = await getFoodItems();
    return NextResponse.json(foodItems);
  } catch (error) {
    // Log the actual error for debugging on the server
    console.error("Failed to fetch food items:", error);

    // Return a structured JSON error response
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching food items.",
      },
      { status: 500 }
    );
  }
};
