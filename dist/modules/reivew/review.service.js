"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const review_model_1 = require("./review.model");
exports.reviewService = {
    async createReview(userId, reviewData) {
        // Check if user already has a review
        const existingReview = await review_model_1.Review.findOne({ userId });
        if (existingReview) {
            throw new ApiError_1.ApiError(400, "You have already submitted a review. You can update your existing review.");
        }
        const review = await review_model_1.Review.create({
            userId,
            ...reviewData,
            status: "pending", // All reviews start as pending
        });
        return review;
    },
    async getUserReviews(userId) {
        return await review_model_1.Review.find({ userId }).sort({ createdAt: -1 });
    },
    async getReviewById(id) {
        const review = await review_model_1.Review.findById(id).populate("userId", "name email");
        if (!review) {
            throw new ApiError_1.ApiError(404, "Review not found");
        }
        return review;
    },
    async updateReview(id, userId, updateData) {
        const review = await review_model_1.Review.findOne({ _id: id, userId });
        if (!review) {
            throw new ApiError_1.ApiError(404, "Review not found or you don't have permission to update it");
        }
        // When a user updates their review, reset status to pending for admin approval
        updateData.status = "pending";
        const updatedReview = await review_model_1.Review.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedReview) {
            throw new ApiError_1.ApiError(404, "Review not found");
        }
        return updatedReview;
    },
    async deleteReview(id, userId, isAdmin) {
        // If admin, can delete any review
        // If regular user, can only delete own review
        const filter = isAdmin ? { _id: id } : { _id: id, userId };
        const result = await review_model_1.Review.deleteOne(filter);
        if (result.deletedCount === 0) {
            throw new ApiError_1.ApiError(404, "Review not found or you don't have permission to delete it");
        }
    },
    async updateReviewStatus(id, status) {
        const review = await review_model_1.Review.findByIdAndUpdate(id, { $set: { status } }, { new: true });
        if (!review) {
            throw new ApiError_1.ApiError(404, "Review not found");
        }
        return review;
    },
    async getAllReviews(page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const filters = {};
        if (status) {
            filters.status = status;
        }
        const reviews = await review_model_1.Review.find(filters)
            .populate("userId", "name email")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await review_model_1.Review.countDocuments(filters);
        return {
            reviews,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
    async getApprovedReviews(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const reviews = await review_model_1.Review.find({ status: "approved" })
            .populate("userId", "name")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await review_model_1.Review.countDocuments({ status: "approved" });
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
