"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectZodSchema = exports.createProjectZodSchema = void 0;
const zod_1 = require("zod");
exports.createProjectZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        technologies: zod_1.z.string({
            required_error: "Technologies is required",
        }),
        category: zod_1.z.string({
            required_error: "Technologies is required",
        }),
        liveUrl: zod_1.z.string().url().optional(),
        githubUrlClient: zod_1.z.string().url().optional(),
        githubUrlServer: zod_1.z.string().url().optional(),
        featured: zod_1.z.boolean().optional(),
        order: zod_1.z.number().optional(),
    }),
});
exports.updateProjectZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        technologies: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        liveUrl: zod_1.z.string().url().optional(),
        githubUrlServer: zod_1.z.string().url().optional(),
        githubUrlClient: zod_1.z.string().url().optional(),
        featured: zod_1.z.boolean().optional(),
        order: zod_1.z.number().optional(),
    }),
});
