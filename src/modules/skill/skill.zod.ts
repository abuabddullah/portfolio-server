import { z } from "zod"

export const createSkillZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    proficiency: z
      .number({
        required_error: "Proficiency is required",
      })
      .min(1, "Proficiency must be at least 1")
      .max(5, "Proficiency must be at most 5"),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
})

export const updateSkillZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    proficiency: z.number().min(1, "Proficiency must be at least 1").max(5, "Proficiency must be at most 5").optional(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
})

