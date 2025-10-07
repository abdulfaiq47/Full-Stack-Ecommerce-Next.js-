import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import productmodels from "@/Models/productmodels";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("cate") || "";

    const categories = await productmodels.find({
      $or: [
        { category: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    });
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { success: false, message: `Error: ${error}` },
      { status: 500 }
    );
  }
}
