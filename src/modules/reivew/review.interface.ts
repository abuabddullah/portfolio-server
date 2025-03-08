import type mongoose from "mongoose";
import type { Document } from "mongoose";
import type { IUser } from "../user/user.interface";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}
