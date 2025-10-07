import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import cartmodel from "@/Models/cartmodel";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const { productId, quantity, price, name, image } = await req.json();
    await connectDB();

    const userId = session.user.id;
    let cart = await cartmodel.findOne({ userid: userId });

    if (!cart) {
      cart = new cartmodel({ userid: userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (p) => p.productId?.toString() === productId?.toString()
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.name = name;
      existingProduct.image = image;
      existingProduct.price = price;
    } else {
      const productObjectId = new mongoose.Types.ObjectId(productId);
      cart.products.push({
        productId: productObjectId,
        quantity,
        price,
        name,
        image,
      });
    }

    await cart.save();

    console.log("Cart saved:", cart);

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Error in /api/cart:", error);
    return NextResponse.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
