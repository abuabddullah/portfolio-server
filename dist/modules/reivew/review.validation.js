"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewStatusSchema = exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().min(1).max(5),
        comment: zod_1.z.string().min(3).max(500),
    }),
});
exports.updateReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number().min(1).max(5).optional(),
        comment: zod_1.z.string().min(3).max(500).optional(),
    }),
});
exports.updateReviewStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "approved", "rejected"]),
    }),
});
