"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.updateFeedback = exports.getFeedbackById = exports.getAllFeedback = exports.createFeedback = void 0;
const http_status_1 = __importDefault(require("http-status"));
const feedback_model_1 = require("./feedback.model");
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
// Create a new feedback
const createFeedback = async (feedbackData) => {
    const newFeedback = await feedback_model_1.Feedback.create(feedbackData);
    return newFeedback;
};
exports.createFeedback = createFeedback;
// Get all feedback with filtering
const getAllFeedback = async (filters, page = 1, limit = 10) => {
    const { isVisible } = filters;
    // Build query
    const query = {};
    // Apply visibility filter
    if (isVisible !== undefined) {
        query.isVisible = isVisible;
    }
    // Calculate pagination
    const skip = (page - 1) * limit;
    // Execute query
    const feedback = await feedback_model_1.Feedback.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await feedback_model_1.Feedback.countDocuments(query);
    return {
        feedback,
        total,
        page,
        limit,
    };
};
exports.getAllFeedback = getAllFeedback;
// Get a single feedback by ID
const getFeedbackById = async (id) => {
    const feedback = await feedback_model_1.Feedback.findById(id);
    if (!feedback) {
        throw new globalErrorHandler_1.AppError("Feedback not found", http_status_1.default.NOT_FOUND);
    }
    return feedback;
};
exports.getFeedbackById = getFeedbackById;
// Update a feedback
const updateFeedback = async (id, updateData) => {
    const feedback = await feedback_model_1.Feedback.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!feedback) {
        throw new globalErrorHandler_1.AppError("Feedback not found", http_status_1.default.NOT_FOUND);
    }
    return feedback;
};
exports.updateFeedback = updateFeedback;
// Delete a feedback
const deleteFeedback = async (id) => {
    const result = await feedback_model_1.Feedback.findByIdAndDelete(id);
    if (!result) {
        throw new globalErrorHandler_1.AppError("Feedback not found", http_status_1.default.NOT_FOUND);
    }
};
exports.deleteFeedback = deleteFeedback;
