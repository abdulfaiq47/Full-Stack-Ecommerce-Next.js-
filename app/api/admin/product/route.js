import { connectDB } from "@/lib/mongodb";
import productmodels from "@/Models/productmodels";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary auto-configures if CLOUDINARY_URL is present
cloudinary.config({
  secure: true, // ensures https URLs
});

export async function POST(req) {
  try {
    // ✅ 1. Verify admin
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not Authorized" },
        { status: 403 }
      );
    }

    // ✅ 2. Connect DB
    await connectDB();

    // ✅ 3. Parse form data
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

    // ✅ 4. Convert file to Base64 and upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "ecommerce_products", // optional
    });

    // ✅ 5. Save product in DB
    const product = await productmodels.create({
      name,
      price,
      discount,
      category,
      image: uploadResult.secure_url,
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
     F