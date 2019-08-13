import { Schema, model, Model } from "mongoose"

const orderModel: Schema = new Schema(
  {
    orderNumber: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    itemsQty: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  },
)

export default model("Order", orderModel)
