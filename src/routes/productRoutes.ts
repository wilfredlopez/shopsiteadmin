import { Request, Response, Router } from "express"

import requiredHeaderToken from "../middlewares/requiredHeaderToken"
import Product from "../models/productModel"

const { check, validationResult } = require("express-validator")

class ProductRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  public async getProducts(req: Request, res: Response) {
    const users = await Product.find({})
    res.send(users)
  }

  public async createProduct(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const exist = await Product.find({ productId: req.body.productId })

      if (exist.length > 0) {
        return res.status(401).json({ error: "Id Already Exist" })
      }

      const newProduct = await new Product({ ...req.body })
      const product = await newProduct.save()

      res.send(product)
    } catch (e) {
      res.status(500).json({ error: "Error creating user", ...e })
    }
  }

  public async getProduct(req: Request, res: Response) {
    const id = req.params.id
    try {
      const product = await Product.findById(id)

      if (!product) {
        res.status(400).json({ error: "Product Not Found" })
      }
      res.json(product)
    } catch (e) {
      res.status(500).json({ error: "Server Error", ...e })
    }
  }

  public async updateProduct(req: Request, res: Response) {
    const id = req.params.id
    try {
      let product = await Product.findOne({ productId: id })
      if (!product) {
        return res.status(404).json({ error: "Not Found" })
      }

      product = { ...req.body, productId: id }
      if (product) {
        await product.save()
        res.send(product)
      } else {
        throw new Error("No Product was provided in body")
      }
    } catch (e) {
      res.json({ error: "Server Error", ...e })
    }
  }
  public async deleteProduct(req: Request, res: Response) {
    const id = req.params.id

    try {
      const product = await Product.findOneAndDelete(
        { productId: id },
        { rawResult: true },
      )

      if (!product.value) {
        return res.status(404).json({ error: "Product Not Found" })
      }
      res.json({ message: "Product Deleted", product: product.value })
    } catch (e) {
      res.status(500).json({ error: "Errors deleting", ...e })
    }
  }

  public async getCategory(req: Request, res: Response) {
    const cat = req.params.cat

    var perPage = req.params.perPage || 9
    var page = req.params.page || 1

    try {
      const categoryProducts = await Product.find({ categories: cat })
        .skip(perPage * page - perPage)
        .limit(perPage)
      //   const categoryProducts = await Product.$where((p: IProductModel) =>
      //     p.categories.includes(cat),
      //   )
      const count = await categoryProducts.length

      res.json({
        products: categoryProducts,
        current: page,
        pages: Math.ceil(count / perPage),
      })
    } catch (e) {
      res.json({ error: "Server Error", ...e })
    }
  }

  public async getCategoryList(req: Request, res: Response) {
    try {
      const products = await Product.find()
      const categories = products.map(p => p.categories)

      const uniques = [...new Set(...categories.map(c => c))]

      res.json(uniques)
    } catch (e) {
      res.json({ error: "Server Error", ...e })
    }
  }

  routes() {
    //GET: api/products/
    this.router.get("/", this.getProducts)
    this.router.get("/category/list", this.getCategoryList)
    this.router.post(
      "/",
      [
        check("productId")
          .not()
          .isEmpty(),
        check("imgUrl").isLength({ min: 2 }),
        check("categories").isLength({ min: 1 }),
      ],
      this.createProduct,
    )
    this.router.get("/category/:cat", this.getCategory)
    this.router.get("/:id", this.getProduct)
    this.router.delete("/:id", requiredHeaderToken, this.deleteProduct)
    this.router.put("/:id", this.updateProduct)
  }
}

const productRoutes = new ProductRoutes()

export default productRoutes.router
