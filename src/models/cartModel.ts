import { Document, Schema, model, Model } from "mongoose"
import { Cart, CartItem } from "../api_types/ShopAppTypes"

export interface ICartModel extends Cart, Document {
  getTotal()
}

export const cartSchema: Schema<ICartModel> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        cartProduct: {
          productId: String,
          price: Number,
          msrp: Number,
          name: String,
          brand: String,
          taxClass: String,
          description: String,
          imgUrl: String,
          img_thumb: String,
        },
        qty: Number,
      },
    ],
    total: Number,
  },
  {
    timestamps: true,
  },
)

cartSchema.pre("save", () => {
  console.log("Cart Pre Save FUnction")
  let total = 0
  this.cartItems.map((item: CartItem) => {
    total += item.qty
  })
  this.total = total
})

cartSchema.methods.getTotal = function(): number {
  let total = 0
  this.cartItems.map((item: CartItem) => {
    total += item.qty
  })

  return total
}

const Cart: Model<ICartModel> = model<ICartModel>("Cart", cartSchema)
export default Cart
