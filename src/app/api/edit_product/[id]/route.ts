import { connectMongo } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo();


        const data = await Product.find();

        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {
                error,
                smg: "something went wrong",
            }, 
            { status: 400 }
        );
    }
}

