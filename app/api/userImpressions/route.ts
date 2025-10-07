import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydb"); // <-- replace with your DB name
    const impressions = await db.collection("userImpressions").find().toArray();

    // convert ObjectId to string
    const serialized = impressions.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
