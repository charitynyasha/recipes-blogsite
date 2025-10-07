import { NextResponse } from "next/server";
import connectDB from "@/db";
import recipeCard from "@/models/recipeCard";

 export const GET = async () => {
    try {
        await connectDB();
        const recipeCards = await recipeCard.find({})
        return new NextResponse(JSON.stringify(recipeCards), {status:200})
    }
    catch(error){
        return new NextResponse("Couldn't connect " + error, {status:500})
    }
 }