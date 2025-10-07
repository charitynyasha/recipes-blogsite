// app/api/userImpressions/[id]/comment/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");
    const { text, author } = await req.json();

    if (!text?.trim()) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    const newComment = { text: text.trim(), author: author ?? null, createdAt: new Date() };

    const result = await db.collection("userImpressions").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $push: { comments: newComment } },
      { returnDocument: "after" }
    );

    if (!result.value) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ...result.value, _id: result.value._id.toString() });
  } catch {
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
