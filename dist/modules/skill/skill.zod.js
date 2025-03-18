"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSkillZodSchema = exports.createSkillZodSchema = void 0;
const zod_1 = require("zod");
exports.createSkillZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        category: zod_1.z.string({
            required_error: "Category is required",
        }),
        proficiency: zod_1.z
            .number({
            required_error: "Proficiency is required",
        })
            .min(1, "Proficiency must be at least 1")
            .max(5, "Proficiency must be at most 5"),
        description: zod_1.z.string().optional(),
        order: zod_1.z.number().optional(),
    }),
});
exports.updateSkillZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        proficiency: zod_1.z.number().min(1, "Proficiency must be at least 1").max(5, "Proficiency must be at most 5").optional(),
        description: zod_1.z.string().optional(),
        order: zod_1.z.number().optional(),
    }),
});
