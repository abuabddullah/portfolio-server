import type { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
import { createFeedback, getAllFeedback, getFeedbackById, updateFeedback, deleteFeedback } from "./feedback.service"
import { catchAsync } from "../../utils/catchAsync"

// Create a new feedback
export const createFeedbackController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const feedback = await createFeedback(req.body)

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Feedback submitted successfully",
    data: feedback,
  })
})

// Get all feedback
export const getAllFeedbackController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { isVisible } = req.query
  const page = Number.parseInt(req.query.page as string) || 1
  const limit = Number.parseInt(req.query.limit as string) || 10

  const filters: any = {}

  if (isVisible !== undefined) {
    filters.isVisible = isVisible === "true"
  }

  const result = await getAllFeedback(filters, page, limit)

  res.status(httpStatus.OK).json({
    status: "success",
    data: result.feedback,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit),
    },
  })
})

// Get a single feedback
export const getFeedbackController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const feedback = await getFeedbackById(id)

  res.status(httpStatus.OK).json({
    status: "success",
    data: feedback,
  })
})

// Update a feedback
export const updateFeedbackController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const updatedFeedback = await updateFeedback(id, req.body)

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Feedback updated successfully",
    data: updatedFeedback,
  })
})

// Delete a feedback
export const deleteFeedbackController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  await deleteFeedback(id)

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Feedback deleted successfully",
  })
})

