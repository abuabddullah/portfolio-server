import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import httpStatus from "http-status"
import { AppError } from "./globalErrorHandler"
import { User } from "../modules/auth/auth.model"

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const protect = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    // 1) Get token from authorization header
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies?.token) {
      token = req.cookies.token
    }

    if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access.", httpStatus.UNAUTHORIZED))
    }

    // 2) Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists.", httpStatus.UNAUTHORIZED))
    }

    // 4) Grant access to protected route
    req.user = currentUser
    next()
  } catch (error) {
    next(new AppError("Authentication failed", httpStatus.UNAUTHORIZED))
  }
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", httpStatus.FORBIDDEN))
    }
    next()
  }
}

