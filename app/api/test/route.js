import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: "Connected" });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
