import type { Document } from "mongoose";

export interface IMedicine extends Document {
  name: string;
  manufacturer: string;
  price: number;
  stock: number;
  category: string;
  imageURL: string;
  description?: string;
  requiresPrescription: boolean;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
