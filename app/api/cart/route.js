import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import cartmodel from "@/Models/cartmodel";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "You must be logged in to view cart" },
        { status: 401 }
      );
    }
    await connectDB();
    const userid = session.user.id;

    let cart = await cartmodel.findOne({
      userid: userid,
    });

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
