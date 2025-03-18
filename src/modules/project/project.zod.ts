import { z } from "zod";

export const createProjectZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    technologies: z.string({
      required_error: "Technologies is required",
    }),
    category: z.string({
      required_error: "Technologies is required",
    }),
    liveUrl: z.string().url().optional(),
    githubUrlClient: z.string().url().optional(),
    githubUrlServer: z.string().url().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

export const updateProjectZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    githubUrlServer: z.string().url().optional(),
    githubUrlClient: z.string().url().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});
