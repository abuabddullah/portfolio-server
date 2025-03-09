import type mongoose from "mongoose";
import type { Document } from "mongoose";
import type { IUser } from "../user/user.interface";

export interface IPrescription extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | IUser | string;
  imageURL: string;
  status: "pending" | "approved" | "rejected";
  orderId?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
