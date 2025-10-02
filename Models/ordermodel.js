import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    Total: {
      required: true,
      type: Number,
    },
    Status: {
      requird: true,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
