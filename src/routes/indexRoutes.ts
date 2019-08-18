import { Request, Response, Router } from "express"
import path from "path"

class IndexRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    this.router.get("/*", (req: Request, res: Response) => {
      res.sendFile(
        path.resolve(__dirname, "..", "..", "react-ui", "build", "index.html"),
      )
    })

    /*
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Api routes are in /api/posts") })
    */
  }
}

const indexRoutes = new IndexRoutes()

export default indexRoutes.router
