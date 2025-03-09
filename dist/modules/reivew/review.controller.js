"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const review_service_1 = require("./review.service");
exports.reviewController = {
    createReview: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const review = await review_service_1.reviewService.createReview(userId, req.body);
        res.status(201).json({
            success: true,
            message: "Review submitted successfully and pending approval",
            data: review,
        });
    }),
    getUserReviews: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const reviews = await review_service_1.reviewService.getUserReviews(userId);
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }),
    getReviewById: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const review = await review_service_1.reviewService.getReviewById(req.params.id);
        res.status(200).json({
            success: true,
            data: review,
        });
    }),
    updateReview: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const review = await review_service_1.reviewService.updateReview(req.params.id, userId, req.body);
        res.status(200).json({
            success: true,
            message: "Review updated successfully and pending approval",
            data: review,
        });
    }),
    deleteReview: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a, _b;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const isAdmin = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
        await review_service_1.reviewService.deleteReview(req.params.id, userId, isAdmin);
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    }),
    updateReviewStatus: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { status } = req.body;
        const review = await review_service_1.reviewService.updateReviewStatus(req.params.id, status);
        res.status(200).json({
            success: true,
            message: `Review ${status} successfully`,
            data: review,
        });
    }),
    getAllReviews: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const status = req.query.status;
        const result = await review_service_1.reviewService.getAllReviews(page, limit, status);
        res.status(200).json({
            success: true,
            data: result.reviews,
            meta: result.meta,
        });
    }),
    getApprovedReviews: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await review_service_1.reviewService.getApprovedReviews(page, limit);
        res.status(200).json({
            success: true,
            data: result.reviews,
            meta: result.meta,
        });
    }),
};
