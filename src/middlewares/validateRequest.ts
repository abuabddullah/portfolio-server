import type { Request, Response, NextFunction } from "express"
import type { AnyZodObject } from "zod"

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
}

