import { z } from "zod"

export const updatePrescriptionStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "approved", "rejected"]),
    notes: z.string().optional(),
  }),
})

