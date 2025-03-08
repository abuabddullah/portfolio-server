import mongoose from "mongoose"
import { ApiError } from "../../utils/ApiError"
import { emailService } from "../../utils/email.service"
import { Order } from "../order/order.model"
import { User } from "../user/user.model"
import type { IPrescription } from "./prescription.interface"
import { Prescription } from "./prescription.model"

export const prescriptionService = {
  async uploadPrescription(userId: string, imageURL: string, orderId?: string): Promise<IPrescription> {
    const prescriptionData: Partial<IPrescription> = {
      userId,
      imageURL,
      status: "pending",
    }

    if (orderId) {
      prescriptionData.orderId = new mongoose.Types.ObjectId(orderId)
    }

    const prescription = await Prescription.create(prescriptionData)

    // If orderId is provided, update the order with the prescription ID
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        prescriptionId: prescription._id,
        prescriptionStatus: "pending",
      })
    }

    return prescription
  },

  async getUserPrescriptions(userId: string): Promise<IPrescription[]> {
    return await Prescription.find({ userId }).sort({ createdAt: -1 })
  },

  async getPrescriptionById(id: string): Promise<IPrescription> {
    const prescription = await Prescription.findById(id)
    if (!prescription) {
      throw new ApiError(404, "Prescription not found")
    }
    return prescription
  },

  async updatePrescriptionStatus(
    id: string,
    status: "pending" | "approved" | "rejected",
    notes?: string,
  ): Promise<IPrescription> {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const prescription = await Prescription.findByIdAndUpdate(id, { status, notes }, { new: true, session })

      if (!prescription) {
        throw new ApiError(404, "Prescription not found")
      }

      // If the prescription is linked to an order, update the order's prescription status
      if (prescription.orderId) {
        await Order.findByIdAndUpdate(prescription.orderId, { prescriptionStatus: status }, { session })

        // Get the order and user to send email notification
        const order = await Order.findById(prescription.orderId)
        const user = await User.findById(prescription.userId)

        if (order && user) {
          await emailService.sendPrescriptionStatusUpdate(order, user, status, notes)
        }
      } else {
        // If not linked to an order, still notify the user about the prescription status
        const user = await User.findById(prescription.userId)
        if (user) {
          // Create a mock order object with minimal information for the email
          const mockOrder = {
            _id: prescription._id.toString(),
            createdAt: prescription.createdAt,
          } as any

          await emailService.sendPrescriptionStatusUpdate(mockOrder, user, status, notes)
        }
      }

      await session.commitTransaction()
      return prescription
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  },

  async getAllPrescriptions(page = 1, limit = 10, filters: Record<string, any> = {}) {
    const skip = (page - 1) * limit
    const prescriptions = await Prescription.find(filters)
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email")
      .populate("orderId")
      .sort({ createdAt: -1 })

    const total = await Prescription.countDocuments(filters)

    return {
      prescriptions,
      meta: {
        page,
        limit,
        total,
      },
    }
  },
}

