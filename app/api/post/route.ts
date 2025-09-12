import { NextResponse } from "next/server";
import connectDB from "@/db";
import post from "@/models/post";

 export const GET = async (request: Request) => {
    try {
        await connectDB();
        const posts = await post.find({})
        return new NextResponse(JSON.stringify(posts), {status:200})
    }
    catch(error){
        return new NextResponse("Couldn't connect " + error, {status:500})
    }
 }