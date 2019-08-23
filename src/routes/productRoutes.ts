import { Request, Response, Router } from "express"

import requiredHeaderToken from "../middlewares/requiredHeaderToken"
import Product from "../models/productModel"
import { CatChild } from "../api_types/ShopAppTypes"

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

  public async createBulkProducts(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      // const exist = await Product.find({ productId: req.body.productId })

      // if (exist.length > 0) {
      //   return res.status(401).json({ error: "Id Already Exist" })
      // }

      Product.find({ productId: req.body.productId }, function(err, data) {
        if (!data) {
          const model = new Product({ ...req.body })
          model.save(function(err, data) {
            res.send({ method: "create", error: err, data: data })
          })
        } else {
          Product.findOneAndUpdate(
            { productId: req.body.productId },
            req.body,
            function() {
              res.send({ method: "update", error: err, data: data })
            },
          )
        }
      })

      // const newProduct = await new Product({ ...req.body })
      // const product = await newProduct.save()

      // res.send(product)
    } catch (e) {
      res.status(500).json({ error: "Error creating product", ...e })
    }
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
      res.status(500).json({ error: "Error creating product", ...e })
    }
  }

  public async getProductByProductId(req: Request, res: Response) {
    const id = req.params.productId
    try {
      const product = await Product.findOne({ productId: id })

      if (!product) {
        res.status(400).json({ error: "Product Not Found" })
      }
      res.json(product)
    } catch (e) {
      res.status(500).json({ error: "Server Error", ...e })
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

  public async getSubCategory(req: Request, res: Response) {
    const catname = req.params.cat
    const subcat = req.params.subcat

    var perPage = req.params.perPage || 9
    var page = req.params.page || 1

    try {
      const categoryProducts = await Product.find({})

        .skip(perPage * page - perPage)
        .limit(perPage)
      //   const categoryProducts = await Product.$where((p: IProductModel) =>
      //     p.categories.includes(cat),
      //   )
      const count = await categoryProducts.length

      res.json({
        products: categoryProducts.filter(
          c =>
            c.mainCategory.name === catname &&
            c.categories.some(val => val.name == subcat),
        ),
        current: page,
        pages: Math.ceil(count / perPage),
      })
    } catch (e) {
      res.json({ error: "Server Error", ...e })
    }
  }

  public async getCategory(req: Request, res: Response) {
    const catname = req.params.cat

    var perPage = req.params.perPage || 9
    var page = req.params.page || 1

    try {
      const categoryProducts = await Product.find({})

        .skip(perPage * page - perPage)
        .limit(perPage)
      //   const categoryProducts = await Product.$where((p: IProductModel) =>
      //     p.categories.includes(cat),
      //   )
      const count = await categoryProducts.length

      res.json({
        products: categoryProducts.filter(c => c.mainCategory.name === catname),
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
      const mainCategories = products.map(p => p.mainCategory)

      let uniqueMain = []

      function verifyIfThere(name: string, main: string): boolean {
        return (
          uniqueMain.filter(m => m.name === name && m.main === main).length > 0
        )
      }

      let uniquessub: CatChild[] = []

      function verifyIfSubThere(c: CatChild): boolean {
        return (
          uniquessub.filter(s => s.main === c.main && s.name === c.name)
            .length > 0
        )
      }

      for (var i of mainCategories) {
        if (!verifyIfThere(i.name, i.main)) {
          uniqueMain.push(i)
        }
      }

      categories.map(c => {
        for (var i of c) {
          if (!verifyIfSubThere(i)) {
            uniquessub.push(i)
          }
        }
      })

      res.json({ main: uniqueMain, subcategories: uniquessub })
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
    this.router.post(
      "/bulk",
      [
        check("productId")
          .not()
          .isEmpty(),
        check("imgUrl").isLength({ min: 2 }),
        check("categories").isLength({ min: 1 }),
      ],
      this.createBulkProducts,
    )
    this.router.get("/category/:cat", this.getCategory)
    this.router.get("/category/:cat/:subcat", this.getSubCategory)
    this.router.get("/:id", this.getProduct)
    this.router.get("/id/:productId", this.getProductByProductId)
    this.router.delete("/:id", requiredHeaderToken, this.deleteProduct)
    this.router.put("/:id", this.updateProduct)
  }
}

const productRoutes = new ProductRoutes()

export default productRoutes.router
