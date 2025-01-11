import { connectMongo } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

const body = await request.json();
const { imgsrc, fileKey, name, category, price } = body;



        await connectMongo();

        const products = await Product.find({
            imgsrc, fileKey, name, category, price
        });

        
        return NextResponse.json({msg: "Product added successfully", data: products});
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
