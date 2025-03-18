import { z } from "zod";

export const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
    summary: z.string({
      required_error: "Summary is required",
    }),
    tags: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    summary: z.string().optional(),
    tags: z.string().optional(),
    published: z.boolean().optional(),
  }),
});
