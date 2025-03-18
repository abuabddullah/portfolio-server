import express from "express"
import {
  createFeedbackController,
  getAllFeedbackController,
  getFeedbackController,
  updateFeedbackController,
  deleteFeedbackController,
} from "./feedback.controller"
import { protect } from "../../middlewares/auth.middleware"
import { validateRequest } from "../../middlewares/validateRequest"
import { createFeedbackZodSchema, updateFeedbackZodSchema } from "./feedback.zod"

const router = express.Router()

// Public routes
router.get("/", getAllFeedbackController)
router.post("/", validateRequest(createFeedbackZodSchema), createFeedbackController)

// Protected routes
router.use(protect)
router.get("/:id", getFeedbackController)
router.patch("/:id", validateRequest(updateFeedbackZodSchema), updateFeedbackController)
router.delete("/:id", deleteFeedbackController)

export const feedbackRoutes = router

