import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./review.service";

export const reviewController = {
  createReview: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const review = await reviewService.createReview(userId, req.body);

      res.status(201).json({
        success: true,
        message: "Review submitted successfully and pending approval",
        data: review,
      });
    }
  ),

  getUserReviews: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const reviews = await reviewService.getUserReviews(userId);

      res.status(200).json({
        success: true,
        data: reviews,
      });
    }
  ),

  getReviewById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const review = await reviewService.getReviewById(req.params.id);

      res.status(200).json({
        success: true,
        data: review,
      });
    }
  ),

  updateReview: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const review = await reviewService.updateReview(
        req.params.id,
        userId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Review updated successfully and pending approval",
        data: review,
      });
    }
  ),

  deleteReview: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const isAdmin = req.user?.role === "admin";

      await reviewService.deleteReview(req.params.id, userId, isAdmin);

      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    }
  ),

  updateReviewStatus: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { status } = req.body;
      const review = await reviewService.updateReviewStatus(
        req.params.id,
        status
      );

      res.status(200).json({
        success: true,
        message: `Review ${status} successfully`,
        data: review,
      });
    }
  ),

  getAllReviews: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const status = req.query.status as string;

      const result = await reviewService.getAllReviews(page, limit, status);

      res.status(200).json({
        success: true,
        data: result.reviews,
        meta: result.meta,
      });
    }
  ),

  getApprovedReviews: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await reviewService.getApprovedReviews(page, limit);

      res.status(200).json({
        success: true,
        data: result.reviews,
        meta: result.meta,
      });
    }
  ),
};
