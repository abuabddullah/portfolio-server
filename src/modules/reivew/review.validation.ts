import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(3).max(500),
  }),
});

export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(3).max(500).optional(),
  }),
});

export const updateReviewStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "approved", "rejected"]),
  }),
});
