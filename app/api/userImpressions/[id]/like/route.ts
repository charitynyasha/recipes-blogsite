// app/api/userImpressions/[id]/like/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");

    const result = await db.collection("userImpressions").findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $inc: { likesCount: 1 } },
      { returnDocument: "after" }
    );

    // TS complains because result.value can be null → handle it explicitly
    if (!result.value) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...result.value,
      _id: result.value._id.toString(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to like item" }, { status: 500 });
  }
}
