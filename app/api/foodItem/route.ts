import { NextResponse } from "next/server";
import connectDB from "@/db";
import foodItem from "@/models/foodItem";

export const GET = async () => {
  try {
    await connectDB();
    const foodItems = await foodItem.find({});
    return new NextResponse(JSON.stringify(foodItems), { status: 200 });
  } catch (error) {
    return new NextResponse("Couldn't connect " + error, { status: 500 });
  }
};
