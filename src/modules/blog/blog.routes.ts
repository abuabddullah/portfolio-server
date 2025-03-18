import express from "express"
import {
  createBlogController,
  getAllBlogsController,
  getBlogController,
  updateBlogController,
  deleteBlogController,
} from "./blog.controller"
import { protect } from "../../middlewares/auth.middleware"
import { validateRequest } from "../../middlewares/validateRequest"
import { createBlogZodSchema, updateBlogZodSchema } from "./blog.zod"
import { uploadBlogImage } from "../../middlewares/upload.middleware"

const router = express.Router()

// Public routes
router.get("/", getAllBlogsController)
router.get("/:id", getBlogController)

// Protected routes
router.use(protect)
router.post("/", uploadBlogImage, validateRequest(createBlogZodSchema), createBlogController)
router.patch("/:id", uploadBlogImage, validateRequest(updateBlogZodSchema), updateBlogController)
router.delete("/:id", deleteBlogController)

export const blogRoutes = router

