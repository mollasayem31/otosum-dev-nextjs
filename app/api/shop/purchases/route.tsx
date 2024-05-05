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
    const collection = db.collection("purchases");
    if (body.category === "all categories") {
      // Query all categories for the provided shopName
      const query = { shopName: body.shopName };
      const result = await collection.find(query).toArray();
      // Return the data as a JSON response
      return NextResponse.json(result, { status: 200 });
    } else {
      // Filter products by category if provided
      const query = { category: body.category, shopName: body.shopName };
      const result = await collection.find(query).toArray();
      // Return the data as a JSON response
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
