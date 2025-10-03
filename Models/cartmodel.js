import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true ,min: 1 },
      price: { type: Number, required: true },
    },
  ],
}, { timestamps: true } );



export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
