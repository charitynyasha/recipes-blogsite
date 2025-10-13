import clientPromise from "@/app/_lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await clientPromise;
    const db = client.db("test");

    const result = await db
      .collection("userImpressions")
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: "Failed to fetch impression", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const client = await clientPromise;
    const db = client.db("test");

    const body = await req.json();
    const { likes, comments } = body;

    const result = await db
      .collection("userImpressions")
      .findOne({ _id: new ObjectId(id) });

    if (!result) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    await db.collection("userImpressions").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          likes: likes ?? result.likes,
          comments: comments ?? result.comments,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: "Failed to update impression", details: errorMessage },
      { status: 500 }
    );
  }
}