// app/api/userImpressions/[id]/like/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  _req: Request, 
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed: params are now Promise
) {
  try {
    const { id } = await params; // ✅ Fixed: await the params
    
    const client = await clientPromise;
    const db = client.db("mydb");

    const result = await db.collection("userImpressions").findOneAndUpdate(
      { _id: new ObjectId(id) }, // ✅ Use the awaited id
      { $inc: { likesCount: 1 } },
      { returnDocument: "after" }
    );

    // ✅ Fixed: TypeScript null check - result itself can be null
    if (!result || !result.value) {
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