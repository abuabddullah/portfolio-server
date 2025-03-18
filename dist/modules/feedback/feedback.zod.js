"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedbackZodSchema = exports.createFeedbackZodSchema = void 0;
const zod_1 = require("zod");
exports.createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        company: zod_1.z.string().optional(),
        position: zod_1.z.string().optional(),
        message: zod_1.z.string({
            required_error: "Message is required",
        }),
        rating: zod_1.z
            .number({
            required_error: "Rating is required",
        })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5"),
        isVisible: zod_1.z.boolean().optional(),
    }),
});
exports.updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        position: zod_1.z.string().optional(),
        message: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
        isVisible: zod_1.z.boolean().optional(),
    }),
});
