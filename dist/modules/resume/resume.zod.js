"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResumeZodSchema = exports.createResumeZodSchema = void 0;
const zod_1 = require("zod");
exports.createResumeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateResumeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional,
        isActive: zod_1.z.boolean().optional(),
    }),
});
