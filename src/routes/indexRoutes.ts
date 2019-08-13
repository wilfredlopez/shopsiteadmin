import { Request, Response, Router } from "express"

class IndexRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.routes()
  }

  routes() {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("Api routes are in /api/posts")
    })
  }
}

const indexRoutes = new IndexRoutes()

export default indexRoutes.router
