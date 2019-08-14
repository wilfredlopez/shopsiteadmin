import { Request, Response, Router } from "express"
import Users from "../models/userModel"
import requiredHeaderToken from "../middlewares/requiredHeaderToken"

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
    const users = await Users.find({})
    res.send(users)
  }

  public async createUser(req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {
      const exist = await Users.find({ email: req.body.email })

      if (exist.length > 0) {
        return res.status(401).json({ error: "Already Exist" })
      }

      const hash = await bcrypt.hashSync(req.body.password, 10)
      const newUser = await new Users({ ...req.body, password: hash })
      const user = await newUser.save()

      const token: string = await jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7 days" },
      )

      const createdUser = await Users.findOne({ email: user.email })

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

      if (!user) {
        res.status(400).json({ error: "User Not Found" })
      }
      res.json(user)
    } catch (e) {
      res.status(500).json({ error: "Server Error", ...e })
    }
  }

  public async updateUser(req: Request, res: Response) {
    const id = req.params.id
    let { password } = req.body

    const { firstName, lastName, email } = req.body

    try {
      const user = await Users.findByIdAndUpdate(
        id,
        { firstName, lastName, password, email },
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
      res.status(401).send({ error: "Authentication Failed" })
    }
  }

  routes() {
    this.router.get("/login", this.login)
    //GET: api/users/
    this.router.get("/", this.getUsers)
    this.router.post(
      "/",
      [check("email").isEmail(), check("password").isLength({ min: 5 })],
      this.createUser,
    )

    this.router.get("/:id", this.getUser)
    this.router.delete("/:id", requiredHeaderToken, this.deleteUser)
    this.router.put("/:id", this.updateUser)
  }
}

const userRoutes = new UserRoutes()

export default userRoutes.router
