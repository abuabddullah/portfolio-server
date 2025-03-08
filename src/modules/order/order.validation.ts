import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        medicineId: z.string(),
        quantity: z.number().int().positive(),
      })
    ),
    shippingAddress: z.object({
      address: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string(),
    }),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
  }),
});

export const updateOrderPrescriptionStatusSchema = z.object({
  body: z.object({
    orderPrescriptionStatus: z.enum([
      "pending",
      "approved",
      "rejected",
      "not_required",
    ]),
  }),
});
