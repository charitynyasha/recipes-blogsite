// app/api/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongodb";
import { ObjectId } from "mongodb";

interface Comment {
  username: string;
  text: string;
  timestamp: string;
}

interface BlogPost {
  _id?: ObjectId;
  title: string;
  description: string;
  body: string;
  tags: string[];
  category: string;
  time: string;
  people: string;
  level: string;
  coverImage: string | null;
  author: string;
  isDraft: boolean;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export async function POST(request: NextRequest) {
  console.log("Blog POST API called");

  try {
    const formData = await request.formData();
    console.log("Form data received");

    // Extract form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const body = formData.get("body") as string;
    const tagsString = formData.get("tags") as string;
    const category = formData.get("category") as string;
    const time = (formData.get("time") as string) || "15 MIN";
    const people = (formData.get("people") as string) || "2 PEOPLE";
    const level = (formData.get("level") as string) || "EASY";
    const isDraft = formData.get("isDraft") === "true";
    const author = (formData.get("author") as string) || "Anonymous";
    const coverImageFile = formData.get("coverImage") as File | null;

    console.log("Extracted form data:", { title, category, isDraft });

    // Validate required fields
    if (!title?.trim()) {
      console.log("Validation failed: Title is required");
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!category?.trim()) {
      console.log("Validation failed: Category is required");
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Convert tags string to array
    let tagsArray: string[] = [];
    try {
      tagsArray = tagsString ? JSON.parse(tagsString) : [];
    } catch {
      // If JSON parsing fails, try comma separation
      tagsArray = tagsString
        ? tagsString
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];
    }

    let coverImageUrl = null;

    // Handle image upload
    if (coverImageFile && coverImageFile.size > 0) {
      console.log("Processing cover image");
      try {
        // Convert file to base64 for storage
        const bytes = await coverImageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        coverImageUrl = `data:${coverImageFile.type};base64,${buffer.toString(
          "base64"
        )}`;
        console.log("Cover image processed successfully");
      } catch (imageError) {
        console.error("Error processing image:", imageError);
        return NextResponse.json(
          { error: "Failed to process image" },
          { status: 400 }
        );
      }
    }

    console.log("Connecting to MongoDB...");
    // In your API route
    const client = await clientPromise;
    const db = client.db("test"); // ← Add your database name hereecified

    const blogPost: BlogPost = {
      title: title.trim(),
      description: description.trim(),
      body: body.trim(),
      tags: tagsArray,
      category: category.trim(),
      time,
      people,
      level,
      coverImage: coverImageUrl,
      author: author.trim(),
      isDraft,
      likes: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: isDraft ? null : new Date(),
    };

    console.log("Inserting blog post into database...");
    const result = await db.collection("blogposts").insertOne(blogPost);
    console.log("Blog post inserted successfully:", result.insertedId);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: isDraft ? "Blog saved as draft" : "Blog published successfully",
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      {
        error:
          "Internal server error: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log("Blog GET API called");

  try {
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    console.log("Connecting to MongoDB...");
    // In your API route
    const client = await clientPromise;
    const db = client.db("test"); // ← Add your database name here

    const query = includeDrafts ? {} : { isDraft: false };

    console.log("Fetching blog posts with query:", query);
    const blogPosts = await db
      .collection("blogposts")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`Found ${blogPosts.length} blog posts`);

    // Convert MongoDB ObjectId to string for JSON serialization
    const serializedPosts = blogPosts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    }));

    return NextResponse.json(serializedPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      {
        error:
          "Failed to fetch blog posts: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
