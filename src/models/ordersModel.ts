import { Schema, model, Model, Document } from "mongoose"

import { Order } from "../api_types/ShopAppTypes"

export interface IOrderModel extends Order, Document {
  //methods here
}

const orderModel: Schema<IOrderModel> = new Schema<IOrderModel>(
  {
    amount: Number,
    status: String,
    orderNumber: { type: String, required: true },
    paymentMethod: {
      expirationDate: { type: Date },
      last4: { type: Number },
      paymentType: String,
    },
    orderDetails: {
      billingAddress: {
        address: String,
        apt: String,
        city: String,
        country: String,
        state: String,
        zipcode: String,
        stateShortName: String,
      },
      items: [],
      salesTax: Number,
      shippingAddress: {
        address: String,
        apt: String,
        city: String,
        country: String,
        state: String,
        zipcode: String,
        stateShortName: String,
      },
      shippingDate: String,
      shippingMethod: String,
      subTotal: Number,
      trackingNumber: String,
      totalPrice: { type: Number, required: true },
      itemsQty: { type: Number, required: true },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Order: Model<IOrderModel> = model<IOrderModel>("Order", orderModel)
export default Order
