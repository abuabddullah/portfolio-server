"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prescription = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const prescriptionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order",
    },
    notes: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Prescription = mongoose_1.default.model("Prescription", prescriptionSchema);
