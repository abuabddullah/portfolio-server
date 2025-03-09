"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePrescriptionStatusSchema = void 0;
const zod_1 = require("zod");
exports.updatePrescriptionStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["pending", "approved", "rejected"]),
        notes: zod_1.z.string().optional(),
    }),
});
