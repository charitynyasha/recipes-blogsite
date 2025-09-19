// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/db";
import BlogPost from "@/models/blogPost";

export async function GET(req: Request) {
  await connectDB();

  // extract ?author= query
  const url     = new URL(req.url);
  const author  = url.searchParams.get("author") || undefined;
  const filter  = author ? { author } : {};

  const posts = await BlogPost.find(filter).sort({ date: -1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectDB();
  const { title, content, image, author } = await req.json();

  if (!title || !content || !author) {
    return NextResponse.json(
      { error: "Missing title, content, or author" },
      { status: 400 }
    );
  }

  const newPost = await BlogPost.create({ title, content, image, author });
  return NextResponse.json(newPost, { status: 201 });
}
