import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, 
        image: { type: String }, 
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],

    Total: {
      required: true,
      type: Number,
    },
    Status: {
      required: true,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      street: String,
      city: String,
      country: String,
      postalCode: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
