import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/db";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    const { db } = await connectToDatabase("otosum-db");
    const collection = db.collection("users");

    const result = await collection.find({}).toArray();
    // Return the products as a JSON response
    return NextResponse.json(result, { status: 200 });

    // Return the products as a JSON response
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    // Connect to the database
    const { db } = await connectToDatabase("otosum-db");
    const collection = db.collection("users");

    const result = await collection.deleteOne({ email: body.email });
    // Return the products as a JSON response
    return NextResponse.json(result, { status: 200 });

    // Return the products as a JSON response
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
