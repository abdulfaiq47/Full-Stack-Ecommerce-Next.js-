// ✅ Force Node.js runtime (Cloudinary needs Node, not Edge)
export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import productmodels from "@/Models/productmodels";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary auto-config from CLOUDINARY_URL
cloudinary.config({
  secure: true,
});

export async function POST(req) {
  try {
    // ✅ Check admin access
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not Authorized" },
        { status: 403 }
      );
    }

    // ✅ Connect MongoDB
    await connectDB();

    // ✅ Get form data
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    const price = formData.get("price");
    const discount = formData.get("discount");
    const category = formData.get("category");

    if (!file || !file.name) {
      return NextResponse.json({
        success: false,
        message: "No image file found!",
      });
    }

    // ✅ Convert file to Base64 string
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // ✅ Upload to Cloudinary
    const upload = await cloudinary.uploader.upload(dataUri, {
      folder: "ecommerce_products",
    });

    // ✅ Save to MongoDB
    const product = await productmodels.create({
      name,
      price,
      discount,
      category,
      image: upload.secure_url,
    });

    return NextResponse.json(
      { success: true, message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
