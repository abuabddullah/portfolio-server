"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileZodSchema = exports.registerZodSchema = exports.loginZodSchema = void 0;
const zod_1 = require("zod");
exports.loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters"),
    }),
});
exports.registerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email format"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters"),
    }),
});
exports.updateProfileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email("Invalid email format").optional(),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(),
    }),
});
