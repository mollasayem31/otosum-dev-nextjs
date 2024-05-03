import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/db";

export async function GET(req: NextRequest) {
  try {
      // Connect to the database
    const { db } = await connectToDatabase("otosum-db");
    const collection = db.collection("subscriptions");
   
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

// SUBSCRIPTIONS POST REQUEST
// SUBSCRIPTIONS INTERFACES
interface IDES{
  id:number;
  value:string;
}
interface ISubscription {
    subscriptionId:number;
    subscriptionType:string;
    name:string;
    price:number;
    shopCount:number;
    des:IDES[];
    paymentLInk:string;
}

async function generateSubscriptionId(db: any): Promise<number> {
  // Find the last used Expenses ID from the database
  const collection = db.collection("subscriptions");
  const lastSubscriptionIdDoc = await collection.findOne({}, { sort: { subscriptionId: -1 } });
  const lastSubscriptionId = lastSubscriptionIdDoc ? lastSubscriptionIdDoc.subscriptionId : 0;

  // Increment the last Expenses ID to generate a new one
  const newSubscriptionId = lastSubscriptionId + 1;

  return newSubscriptionId;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { message: "Title, Business Name, and Category are required" },
        { status: 400 }
      );
    }
    // Connect to the database
    const { db } = await connectToDatabase("otosum-db");
    const collection = db.collection("subscriptions");
    // Check if the product already exists in the database
    const existingProduct = await collection.findOne({
      name: body.name,
    });

    // If the product already exists, return an error
    if (existingProduct) {
      return NextResponse.json(
        { message: "Subscription already exists" },
        { status: 400 }
      );
    }

    // Generate a new Expenses ID
    const subscriptionId = await generateSubscriptionId(db);

    // Create a new Subscription
    const newSubscription: ISubscription = {
        subscriptionId:subscriptionId,
        subscriptionType:body.subscriptionType,
        name:body.name,
        price:body.price,
        shopCount:body.shopCount,
        des:body.des,
        paymentLInk:body.paymentLink

    };
    console.log(newSubscription);

    // Insert the new Subscription into the database
    const result = await collection.insertOne(newSubscription);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

