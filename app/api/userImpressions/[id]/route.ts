import clientPromise from "@/app/_lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName"); // change to your DB name

    const result = await db
      .collection("userImpressions")
      .findOne({ _id: new ObjectId(params.id) });

    if (!result) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch impression", details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName"); // change to your DB name

    const body = await req.json();
    const { likes, comments } = body;

    const result = await db
      .collection("userImpressions")
      .findOne({ _id: new ObjectId(params.id) });

    if (!result) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    await db.collection("userImpressions").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          likes: likes ?? result.likes,
          comments: comments ?? result.comments,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update impression", details: error.message },
      { status: 500 }
    );
  }
}
