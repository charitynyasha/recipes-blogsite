import { NextResponse } from "next/server";
import connectDB from "@/db";
import recipeBread from "@/models/recipeBread";

export const GET = async () => {
  try {
    await connectDB();
    const recipeBreads = await recipeBread.find({});
    return new NextResponse(JSON.stringify(recipeBreads), { status: 200 });
  } catch (error) {
    return new NextResponse("Couldn't connect " + error, { status: 500 });
  }
};
