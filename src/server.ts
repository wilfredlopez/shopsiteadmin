import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import mongoose from "mongoose"
import cors from "cors"

import indexRoutes from "./routes/indexRoutes"
import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"

class Server {
  app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }
  config() {
    //db
    mongoose.set("useFindAndModify", true)
    mongoose
      .connect(process.env.MONGO_DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
      })
      .then(db => console.log("conected to dabatase"))
      .catch(e => console.log(e))
    //Settings
    this.app.set("port", process.env.PORT || 5000)

    //middleware
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan("dev"))
    this.app.use(helmet())
    this.app.use(compression())
  }

  routes() {
    this.app.use("/", indexRoutes)
    this.app.use("/api/users", userRoutes)
    this.app.use("/api/products", productRoutes)
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Listening on port ${this.app.get("port")}`)
    })
  }
}

const server = new Server()
server.start()
