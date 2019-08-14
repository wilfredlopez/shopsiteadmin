import { Document, Schema, model, Model } from "mongoose"
import { IUser } from "../interfaces/user"

export interface IUserModel extends IUser, Document {
  fullName(): string
}

export const userSchema: Schema<IUserModel> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    token: String,
  },
  {
    timestamps: true,
  },
)

userSchema.methods.fullName = function(): string {
  return this.firstName.trim() + " " + this.lastName.trim()
}

const User: Model<IUserModel> = model<IUserModel>("User", userSchema)
export default User
