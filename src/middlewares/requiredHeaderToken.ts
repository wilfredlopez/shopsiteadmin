import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const requiredHeaderToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //expected headers: {Authorization: 'Bearer thisIsMyTokenINFO'}
  const authHeader = req.get("Authorization")

  function sendError() {
    res.status(402).json({ error: "Unauthorized" })
  }

  if (!authHeader) {
    return sendError()
  }

  if (req.headers.authorization) {
    const token = await req.headers.authorization.split(" ")[1]
    if (!token || token === "") {
      return sendError()
    }
    if (process.env.JWT_SECRET) {
      try {
        await jwt.verify(token, process.env.JWT_SECRET)
      } catch (error) {
        return sendError()
      }
    } else {
      console.log("NO JWT SECRET In PROCESS.ENV")
      sendError()
    }
  } else {
    console.log("NO HEADERS.AUTHORIZATION PRESENT")
    sendError()
  }

  next()
}

export default requiredHeaderToken
