import { NextResponse } from "next/server";
import connectDB from "@/db";
import blogPost from "@/models/blogPost";

export async function GET() {
  try {
    await connectDB();
    const blogs = await blogPost.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newBlog = await blogPost.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
