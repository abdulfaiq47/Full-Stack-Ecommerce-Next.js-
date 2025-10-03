import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import productmodels from "@/Models/productmodels";

export async function GET(req) {
  try {
    await connectDB();

    let products = await productmodels.aggregate([
      {
        $group: {
          _id: "$category",
          items: { $push: "$$ROOT" },
        },
      },
    ]);

    return NextResponse.json({ success: true, getproduct: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
