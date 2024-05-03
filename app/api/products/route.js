import { NextResponse } from "next/server";
import connectMongoDB from "../../../utils/connectMongoDB";
import Product from "../../../models/productModel";

export async function POST(request) {
  try {
    connectMongoDB();
    const reqOBJ = await request.json();
    const page = parseInt(reqOBJ.page) || 1;
    const limit = 6;
    let query = {};
    if (reqOBJ.search) {
      const search = reqOBJ.search;
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }
    const totalProductItems = await Product.countDocuments(query);
    const totalpages = Math.ceil(totalProductItems / limit);
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    return NextResponse.json(
      {
        success: true,
        data: products,
        page,
        totalpages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
