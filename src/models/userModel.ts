import { Schema, model } from "mongoose"

const userModel = new Schema(
  {
    fistname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export default model("User", userModel)
