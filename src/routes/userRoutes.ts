import { Request, Response, Router } from "express"
import Users from "../models/userModel"
const { check, validationResult } = require("express-validator")

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
      const newUser = new Users(req.body)
      await newUser.save()
      res.send(newUser)
    } catch (e) {
      res.status(500).json({ error: "Error creating user", ...e })
    }

    //   const user = Users.create(newUser)
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
    const { firstname, lastname, password, email } = req.body

    try {
      const user = await Users.findByIdAndUpdate(
        id,
        { firstname, lastname, password, email },
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

  routes() {
    //GET: api/users/
    this.router.get("/", this.getUsers)
    this.router.post(
      "/",
      [check("email").isEmail(), check("password").isLength({ min: 5 })],
      this.createUser,
    )
    this.router.get("/:id", this.getUser)
    this.router.delete("/:id", this.deleteUser)
    this.router.put("/:id", this.updateUser)
  }
}

const userRoutes = new UserRoutes()

export default userRoutes.router
