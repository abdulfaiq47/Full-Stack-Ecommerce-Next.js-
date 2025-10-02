import { connectDB } from "@/lib/mongodb";
import productmodels from "@/Models/productmodels";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not Authorized" },
        { status: 403 }
      );
    }
    await connectDB();
    const result = await req.json();
    const CProducts = await productmodels.create(result);
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
