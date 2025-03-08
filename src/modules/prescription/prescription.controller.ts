import type { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { prescriptionService } from "./prescription.service"

export const prescriptionController = {
  uploadPrescription: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id
    const imageURL = req.file?.path

    if (!imageURL) {
      return res.status(400).json({
        success: false,
        message: "Prescription image is required",
      })
    }

    const prescription = await prescriptionService.uploadPrescription(userId, imageURL, req.body.orderId)

    res.status(201).json({
      success: true,
      message: "Prescription uploaded successfully",
      data: prescription,
    })
  }),

  getUserPrescriptions: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id
    const prescriptions = await prescriptionService.getUserPrescriptions(userId)
    res.status(200).json({
      success: true,
      data: prescriptions,
    })
  }),

  getPrescriptionById: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const prescription = await prescriptionService.getPrescriptionById(req.params.id)
    res.status(200).json({
      success: true,
      data: prescription,
    })
  }),

  updatePrescriptionStatus: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { status, notes } = req.body
    const prescription = await prescriptionService.updatePrescriptionStatus(id, status, notes)
    res.status(200).json({
      success: true,
      message: "Prescription status updated successfully",
      data: prescription,
    })
  }),

  getAllPrescriptions: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const status = req.query.status as string

    const filters: Record<string, any> = {}
    if (status) filters.status = status

    const prescriptions = await prescriptionService.getAllPrescriptions(page, limit, filters)
    res.status(200).json({
      success: true,
      data: prescriptions,
    })
  }),
}

