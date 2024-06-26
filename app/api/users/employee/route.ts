import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate the request body
    if (!body.businessName) {
      return NextResponse.json(
        { message: "Business Name is required" },
        { status: 400 }
      );
    }
    // Connect to the database
    const { db } = await connectToDatabase(body.businessName);
    const collection = db.collection("employees");

    // Filter products by category if provided
    const query = { email: body.email, password: body.password };
    const result = await collection.findOne(query);
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
