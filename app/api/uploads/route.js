import { NextResponse } from "next/server";
import connectMongoDB from "../../../utils/connectMongoDB";
import Product from "../../../models/productModel";

export async function POST(request) {
  try {
    connectMongoDB();
    const products = await request.json();
    const productData = await Product.create(products);
    return NextResponse.json(
      {
        success: true,
        message: "created product items in to the Database",
        data: productData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create Product Item in to the Database",
      },
      { status: 500 }
    );
  }
}
