import mongoose from "mongoose"
import type { IPrescription } from "./prescription.interface"

const prescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const Prescription = mongoose.model<IPrescription>("Prescription", prescriptionSchema)

