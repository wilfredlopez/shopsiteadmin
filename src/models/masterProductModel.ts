import { Schema, model, Model } from "mongoose"

const masterProductModel = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    searchable: Boolean,
    online: Boolean,
    gender: String,
    taxClass: String,
    MSRP: { type: Number },
    products: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    categories: {
      type: [String], //['Men, Cloathing, Women']
    },
  },
  {
    timestamps: true,
  },
)

export default model("Product", masterProductModel)
