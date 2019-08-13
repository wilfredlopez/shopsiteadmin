import { Schema, model, Model } from "mongoose"

const productModel: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    searchable: Boolean,
    online: Boolean,
    color: String,
    size: String,
    gender: String,
    taxClass: String,
    MSRP: { type: Number },
    imagesUrls: { type: [String] },
    availableQty: { type: Number, default: 0 },
    categories: {
      type: [String], //['Men, Cloathing, Women']
    },
  },
  {
    timestamps: true,
  },
)

export default model("Product", productModel)
