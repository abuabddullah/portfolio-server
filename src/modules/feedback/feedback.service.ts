import httpStatus from "http-status"
import { Feedback } from "./feedback.model"
import type { IFeedback, IFeedbackFilters } from "./feedback.type"
import { AppError } from "../../middlewares/globalErrorHandler"

// Create a new feedback
export const createFeedback = async (feedbackData: IFeedback): Promise<IFeedback> => {
  const newFeedback = await Feedback.create(feedbackData)
  return newFeedback
}

// Get all feedback with filtering
export const getAllFeedback = async (
  filters: IFeedbackFilters,
  page = 1,
  limit = 10,
): Promise<{ feedback: IFeedback[]; total: number; page: number; limit: number }> => {
  const { isVisible } = filters

  // Build query
  const query: any = {}

  // Apply visibility filter
  if (isVisible !== undefined) {
    query.isVisible = isVisible
  }

  // Calculate pagination
  const skip = (page - 1) * limit

  // Execute query
  const feedback = await Feedback.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)

  const total = await Feedback.countDocuments(query)

  return {
    feedback,
    total,
    page,
    limit,
  }
}

// Get a single feedback by ID
export const getFeedbackById = async (id: string): Promise<IFeedback> => {
  const feedback = await Feedback.findById(id)

  if (!feedback) {
    throw new AppError("Feedback not found", httpStatus.NOT_FOUND)
  }

  return feedback
}

// Update a feedback
export const updateFeedback = async (id: string, updateData: Partial<IFeedback>): Promise<IFeedback> => {
  const feedback = await Feedback.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!feedback) {
    throw new AppError("Feedback not found", httpStatus.NOT_FOUND)
  }

  return feedback
}

// Delete a feedback
export const deleteFeedback = async (id: string): Promise<void> => {
  const result = await Feedback.findByIdAndDelete(id)

  if (!result) {
    throw new AppError("Feedback not found", httpStatus.NOT_FOUND)
  }
}

