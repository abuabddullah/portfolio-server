import { z } from "zod";

export const createMedicineSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    manufacturer: z.string().min(2),
    price: z.number().positive(),
    stock: z.number().int().min(0),
    category: z.string().min(2),
    requiresPrescription: z.boolean().or(z.string()),
    description: z.string().optional(),
    expiryDate: z.string().or(z.date()),
  }),
});

export const updateMedicineSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    manufacturer: z.string().min(2).optional(),
    price: z.number().positive().optional(),
    genericName: z.string().optional(),
    stock: z.number().int().min(0).optional(),
    category: z.string().optional(),
    requiresPrescription: z.boolean().or(z.string()).optional(),
    imageURL: z.string().url().optional(),
    description: z.string().optional(),
    expiryDate: z.string().or(z.date()).optional(),
    dosage: z.string().optional(),
    sideEffects: z.string().optional(),
  }),
});
