import { NextResponse } from "next/server";
import connectDB from "@/db";
import VideoRecipe from "@/models/VideoRecipe";

 export async function GET() {
    try {
        await connectDB();
        const VideoRecipes = await VideoRecipe.find({});
        return new NextResponse(JSON.stringify(VideoRecipes), { status: 200 });
    }
    catch (error) {
        return new NextResponse("Couldn't connect " + error, { status: 500 });
    }
}