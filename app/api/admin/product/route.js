import { connectDB } from "@/lib/mongodb";
import productmodels from "@/Models/productmodels";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session?.user?.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not Authorized" },
        { status: 403 }
      );
    }

    await connectDB();

    const formData = await req.formData();

    const file = formData.get("image");
    const name = formData.get("name");
    const price = formData.get("price");
    const discount = formData.get("discount");

    // ✅ Ensure file exists
    if (!file || !file.name) {
      return NextResponse.json({
        success: false,
        message: "No image file found!",
      });
    }

    // ✅ Convert image file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Create unique filename
    const filename = `${Date.now()}-${file.name}`;

    // ✅ Full path where file will be saved
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    // ✅ Write file to /public/uploads folder
    await writeFile(filePath, buffer);


    // ✅ Save product info in MongoDB
    const product = await productmodels.create({
      name,
      price,
      discount,
      image: `/uploads/${filename}`, // only path, not binary
      category: formData.get("category"),
    });

    return NextResponse.json(
      { success: true, message: "Created product" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
