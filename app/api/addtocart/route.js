import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import cartmodel from "@/Models/cartmodel";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    const { productId, quantity, price } = await req.json();

    await connectDB();

    const userId = session.user.id;

    let cart = await cartmodel.findOne({ userid: userId });

    if (!cart) {
      cart = new cartmodel({ userid: userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity, price });
    }

    await cart.save();

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
