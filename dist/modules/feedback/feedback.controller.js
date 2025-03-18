"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedbackController = exports.updateFeedbackController = exports.getFeedbackController = exports.getAllFeedbackController = exports.createFeedbackController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const feedback_service_1 = require("./feedback.service");
const catchAsync_1 = require("../../utils/catchAsync");
// Create a new feedback
exports.createFeedbackController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const feedback = await (0, feedback_service_1.createFeedback)(req.body);
    res.status(http_status_1.default.CREATED).json({
        status: "success",
        message: "Feedback submitted successfully",
        data: feedback,
    });
});
// Get all feedback
exports.getAllFeedbackController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { isVisible } = req.query;
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const filters = {};
    if (isVisible !== undefined) {
        filters.isVisible = isVisible === "true";
    }
    const result = await (0, feedback_service_1.getAllFeedback)(filters, page, limit);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: result.feedback,
        meta: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: Math.ceil(result.total / result.limit),
        },
    });
});
// Get a single feedback
exports.getFeedbackController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const feedback = await (0, feedback_service_1.getFeedbackById)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: feedback,
    });
});
// Update a feedback
exports.updateFeedbackController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const updatedFeedback = await (0, feedback_service_1.updateFeedback)(id, req.body);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Feedback updated successfully",
        data: updatedFeedback,
    });
});
// Delete a feedback
exports.deleteFeedbackController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    await (0, feedback_service_1.deleteFeedback)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Feedback deleted successfully",
    });
});
