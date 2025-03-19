import express from "express";
import { protect } from "../../middlewares/auth.middleware";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogController,
  updateBlogController,
} from "./blog.controller";

const router = express.Router();

// Public routes
router.get("/", getAllBlogsController);
router.get("/:id", getBlogController);

// Protected routes
router.use(protect);
router.post("/", createBlogController);
router.patch("/:id", updateBlogController);
router.delete("/:id", deleteBlogController);

export const blogRoutes = router;
