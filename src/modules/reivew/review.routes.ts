import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { validateRequest } from "../../middlewares/validateRequest";
import { reviewController } from "./review.controller";
import {
  createReviewSchema,
  updateReviewSchema,
  updateReviewStatusSchema,
} from "./review.validation";

const router = express.Router();

// Public routes
router.get("/approved", reviewController.getApprovedReviews);

// User routes (requires authentication)
router.post(
  "/",
  auth(),
  validateRequest(createReviewSchema),
  reviewController.createReview
);
router.get("/my-reviews", auth(), reviewController.getUserReviews);
router.patch(
  "/:id",
  auth(),
  validateRequest(updateReviewSchema),
  reviewController.updateReview
);
router.delete("/:id", auth(), reviewController.deleteReview);

// Admin routes
router.get("/", auth(), isAdmin, reviewController.getAllReviews);
router.get("/:id", auth(), reviewController.getReviewById);
router.patch(
  "/:id/status",
  auth(),
  isAdmin,
  validateRequest(updateReviewStatusSchema),
  reviewController.updateReviewStatus
);

export const reviewRoutes = router;
