import { Request, Response, Router } from "express"

import Order from "../models/ordersModel"

const { check, validationResult } = require("express-validator")

class OrderRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  public async getOrders(req: Request, res: Response) {
    const orders = await Order.find({})
    res.send(orders)
  }

  public async createOrder(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const exist = await Order.find({ orderNumber: req.body.orderNumber })

      if (exist.length > 0) {
        return res.status(401).json({ error: "Order Number Already Exist" })
      }

      const newOrder = await new Order({ ...req.body })
      const order = await newOrder.save()

      res.send(order)
    } catch (e) {
      res.status(500).json({ error: "Error creating Order", ...e })
    }
  }

  public async getOrder(req: Request, res: Response) {
    const id = req.params.id
    try {
      const order = await Order.findById(id)

      if (!order) {
        res.status(400).json({ error: "Order Not Found" })
      }
      res.json(order)
    } catch (e) {
      res.status(500).json({ error: "Server Error", ...e })
    }
  }

  routes() {
    //GET: api/products/
    this.router.get("/", this.getOrders)
    this.router.post("/", this.createOrder)
    this.router.get("/:id", this.getOrder)
  }
}

const orderRoutes = new OrderRoutes()

export default orderRoutes.router
