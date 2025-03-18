import { z } from "zod"

export const createFeedbackZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    company: z.string().optional(),
    position: z.string().optional(),
    message: z.string({
      required_error: "Message is required",
    }),
    rating: z
      .number({
        required_error: "Rating is required",
      })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    isVisible: z.boolean().optional(),
  }),
})

export const updateFeedbackZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    position: z.string().optional(),
    message: z.string().optional(),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
    isVisible: z.boolean().optional(),
  }),
})

