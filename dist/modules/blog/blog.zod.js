"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogZodSchema = exports.createBlogZodSchema = void 0;
const zod_1 = require("zod");
exports.createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        content: zod_1.z.string({
            required_error: "Content is required",
        }),
        summary: zod_1.z.string({
            required_error: "Summary is required",
        }),
        tags: zod_1.z.string().optional(),
        published: zod_1.z.boolean().optional(),
    }),
});
exports.updateBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        summary: zod_1.z.string().optional(),
        tags: zod_1.z.string().optional(),
        published: zod_1.z.boolean().optional(),
    }),
});
