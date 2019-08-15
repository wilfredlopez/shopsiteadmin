import { Document, Schema, model, Model } from "mongoose"
import { Account } from "../api_types/ShopAppTypes"
import { ICartModel } from "./cartModel"

export type IUserDocument = Document & Account

export interface IUserModel extends IUserDocument {
  fullName(): string
  setFields(): void
}

export const userSchema: Schema<IUserModel> = new Schema<IUserModel>(
  {
    token: String,
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    profile: {
      email: { type: String },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phoneNumber: Number,
      dateOfBirth: Date,
      shippingInformation: {
        address: String,
        apt: String,
        city: String,
        country: String,
        state: String,
        zipcode: String,
        stateShortName: String,
      },
      billingInformation: {
        address: String,
        apt: String,
        city: String,
        country: String,
        state: String,
        zipcode: String,
        stateShortName: String,
      },
      orders: {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre("save", next => {
  //do whatever

  next()
})

userSchema.methods.fullName = function(): string {
  return this.profile.firstName.trim() + " " + this.profile.lastName.trim()
}

const User: Model<IUserModel> = model<IUserModel>("User", userSchema)
export default User
