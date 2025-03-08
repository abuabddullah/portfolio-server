import { ApiError } from "../../utils/ApiError";
import type { IReview } from "./review.interface";
import { Review } from "./review.model";

export const reviewService = {
  async createReview(
    userId: string,
    reviewData: Partial<IReview>
  ): Promise<IReview> {
    // Check if user already has a review
    const existingReview = await Review.findOne({ userId });
    if (existingReview) {
      throw new ApiError(
        400,
        "You have already submitted a review. You can update your existing review."
      );
    }

    const review = await Review.create({
      userId,
      ...reviewData,
      status: "pending", // All reviews start as pending
    });

    return review;
  },

  async getUserReviews(userId: string): Promise<IReview[]> {
    return await Review.find({ userId }).sort({ createdAt: -1 });
  },

  async getReviewById(id: string): Promise<IReview> {
    const review = await Review.findById(id).populate("userId", "name email");
    if (!review) {
      throw new ApiError(404, "Review not found");
    }
    return review;
  },

  async updateReview(
    id: string,
    userId: string,
    updateData: Partial<IReview>
  ): Promise<IReview> {
    const review = await Review.findOne({ _id: id, userId });
    if (!review) {
      throw new ApiError(
        404,
        "Review not found or you don't have permission to update it"
      );
    }

    // When a user updates their review, reset status to pending for admin approval
    updateData.status = "pending";

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedReview) {
      throw new ApiError(404, "Review not found");
    }

    return updatedReview;
  },

  async deleteReview(
    id: string,
    userId: string,
    isAdmin: boolean
  ): Promise<void> {
    // If admin, can delete any review
    // If regular user, can only delete own review
    const filter = isAdmin ? { _id: id } : { _id: id, userId };

    const result = await Review.deleteOne(filter);
    if (result.deletedCount === 0) {
      throw new ApiError(
        404,
        "Review not found or you don't have permission to delete it"
      );
    }
  },

  async updateReviewStatus(
    id: string,
    status: "pending" | "approved" | "rejected"
  ): Promise<IReview> {
    const review = await Review.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!review) {
      throw new ApiError(404, "Review not found");
    }

    return review;
  },

  async getAllReviews(
    page = 1,
    limit = 10,
    status?: string
  ): Promise<{
    reviews: IReview[];
    meta: { page: number; limit: number; total: number };
  }> {
    const skip = (page - 1) * limit;
    const filters: Record<string, any> = {};

    if (status) {
      filters.status = status;
    }

    const reviews = await Review.find(filters)
      .populate("userId", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments(filters);

    return {
      reviews,
      meta: {
        page,
        limit,
        total,
      },
    };
  },

  async getApprovedReviews(
    page = 1,
    limit = 10
  ): Promise<{
    reviews: IReview[];
    meta: { page: number; limit: number; total: number };
  }> {
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ status: "approved" })
      .populate("userId", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments({ status: "approved" });

    return {
      reviews,
      meta: {
        page,
        limit,
        total,
      },
    };
  },
};
