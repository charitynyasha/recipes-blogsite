import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // ✅ Fixed: params are now Promise
) {
  try {
    const { id } = await params; // ✅ Fixed: await the params
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("mydb");

    const impression = await db.collection("userImpressions").findOne({
      _id: new ObjectId(id),
    });

    if (!impression) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(impression);
  } catch (error) {
    console.error("Error fetching user impression:", error);
    return NextResponse.json({ error: "Failed to fetch impression" }, { status: 500 });
  }
}