import type mongoose from "mongoose"
import type { Document } from "mongoose"
import type { IUser } from "../user/user.interface"

export interface IOrderItem {
  medicineId: string
  quantity: number
  price: number
  requiresPrescription: boolean
}

export type TOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId | IUser
  items: IOrderItem[]
  totalPrice: number
  status: TOrderStatus
  paymentStatus: "pending" | "completed" | "failed"
  prescriptionStatus?: "pending" | "approved" | "rejected" | "not_required"
  prescriptionId?: mongoose.Types.ObjectId
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
}

