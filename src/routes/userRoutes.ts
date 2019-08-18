import { Request, Response, Router } from "express"
import Users, { IUserModel } from "../models/userModel"
import requiredHeaderToken from "../middlewares/requiredHeaderToken"
import Order from "../models/ordersModel"
import Cart from "../models/cartModel"
import User from "../models/userModel"
const { check, validationResult } = require("express-validator")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class UserRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  public async getUsers(req: Request, res: Response) {
    const users = await Users.find({}).select("-password")
    res.send(users)
  }

  public async createUser(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    const emailReg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    const isValidEmail = emailReg.test(email)

    if (!isValidEmail) {
      return res.status(422).json({ error: "Invalid Email" })
    }

    try {
      const exist = await Users.find({ email })

      if (exist.length > 0) {
        return res.status(401).json({ error: "Already Exist" })
      }

      const hash = await bcrypt.hashSync(password, 10)
      const newUser = await new Users({
        ...req.body,
        profile: {
          ...req.body.profile,
          email: req.body.email,
          password: hash,
        },
        password: hash,
      })

      const user = await newUser.save()

      const token: string = await jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" },
      )

      const createdUser = await Users.findById(user._id)

      createdUser.token = token

      await createdUser.save()

      res.send(newUser)
    } catch (e) {
      res.status(500).json({ error: "Error creating user", ...e })
    }
  }

  public async getUser(req: Request, res: Response) {
    const id = req.params.id
    try {
      const user = await Users.findById(id)
        .select("-password")
        .populate("orders")

      let Orders: any = []
      try {
        Orders = await Order.find({ user: user._id })
      } catch (error) {}

      if (!user) {
        res.status(400).json({ error: "User Not Found" })
      }
      res.json({ user, Orders })
    } catch (e) {
      res.status(500).json({ error: "Server Error", ...e })
    }
  }

  public async updateUser(req: Request, res: Response) {
    const id = req.params.id
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const user: IUserModel = await Users.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true },
      )
      if (!user) {
        return res.status(404).json({ error: "Not Found" })
      }

      res.send(user)
    } catch (e) {
      res.json({ error: "Server Error", ...e })
    }
  }
  public async deleteUser(req: Request, res: Response) {
    const id = req.params.id

    try {
      const user = await Users.findByIdAndDelete(id, { rawResult: true })

      if (!user.value) {
        return res.status(404).json({ error: "User Not Found" })
      }
      res.json({ message: "User Deleted", user: user.value })
    } catch (e) {
      res.status(500).json({ error: "Errors deleting", ...e })
    }
    res.send("user route")
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user = await Users.findOne({ email: email })

      if (!user) {
        throw new Error("Authentication Failed")
      }
      const isMatch = await bcrypt.compareSync(password, user.password) // true

      if (isMatch) {
        const token = await jwt.sign(
          {
            userId: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7 days" },
        )

        user.token = token

        return res.send(user)
      }
      res.status(401).send({ error: "Authentication Failed" })
    } catch (err) {
      res.status(500).send({ error: "Authentication Failed" })
    }
  }

  public async getUserCart(req: Request, res: Response) {
    const id = req.params.id

    try {
      const cart = await Cart.find({ userId: id })

      res.json(cart)
    } catch (e) {
      res.json({ error: "Not Found", ...e })
    }
  }

  public async addUserCart(req: Request, res: Response) {
    const id = req.params.id

    try {
      let options = { upsert: true, new: true, setDefaultsOnInsert: true }

      const cart = await Cart.findOneAndUpdate(
        { userId: id },
        {
          ...req.body,
        },
        options,
      )

      res.json(cart)
    } catch (e) {
      res.json({ error: "Server Error", ...e })
    }
  }

  public async verifyToken(req: Request, res: Response) {
    const token = req.params.token

    if (!token) {
      return res.json({ error: "Token must be provided in url parameters" })
    }

    try {
      const verify = await jwt.verify(token, process.env.JWT_SECRET)

      try {
        const user = await User.findById(verify.userId)
        return res.json(user)
      } catch (e) {
        return res.status(404).json({ error: "Not Found", ...e })
      }
    } catch (e) {
      res.status(401).json({ error: "You are not Authorized", ...e })
    }
  }

  routes() {
    this.router.get("/verify/:token", this.verifyToken)
    this.router.post("/login", this.login)
    //GET: api/users/
    this.router.get("/", this.getUsers)
    this.router.post(
      "/",
      [
        check("email", "Invalid Email").isEmail(),
        check("password", "Password lenght most be at least 5").isLength({
          min: 5,
        }),
      ],
      this.createUser,
    )

    this.router.get("/:id", this.getUser)
    this.router.get("/cart/:id", this.getUserCart)
    this.router.post("/cart/:id", this.addUserCart)
    this.router.delete("/:id", requiredHeaderToken, this.deleteUser)
    this.router.put(
      "/:id",
      [
        check("email", "Invalid Email").isEmail(),
        check("password", "Password lenght most be at least 5").isLength({
          min: 5,
        }),
        check("_id")
          .not()
          .exists(),
        check("token")
          .not()
          .exists(),
      ],
      this.updateUser,
    )
  }
}

const userRoutes = new UserRoutes()

export default userRoutes.router
