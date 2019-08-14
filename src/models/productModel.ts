import { Document, Schema, model, Model } from "mongoose"
import { Product } from "../api_types/ShopAppTypes"

export interface IProductModel extends Product, Document {
  //methods here
}

export const productSchema: Schema<IProductModel> = new Schema(
  {
    productId: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    msrp: { type: Number, required: true },
    condition: String,
    searchable: Boolean,
    online: Boolean,
    color: String,
    size: String,
    gender: String,
    taxClass: String,
    imgUrl: { type: String, required: true },
    img_thumb: String,
    available: { type: Boolean, default: false },
    inventoryOnHand: { type: Number, default: 0 },
    ageGroup: String,
    categories: {
      type: [String], //['Men, Cloathing, Women']
    },
  },
  {
    timestamps: true,
  },
)

const Product: Model<IProductModel> = model<IProductModel>(
  "Product",
  productSchema,
)
export default Product
