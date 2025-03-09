"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = require("../../utils/ApiError");
const email_service_1 = require("../../utils/email.service");
const order_model_1 = require("../order/order.model");
const user_model_1 = require("../user/user.model");
const prescription_model_1 = require("./prescription.model");
exports.prescriptionService = {
    async uploadPrescription(userId, imageURL, orderId) {
        const prescriptionData = {
            userId,
            imageURL,
            status: "pending",
        };
        if (orderId) {
            prescriptionData.orderId = new mongoose_1.default.Types.ObjectId(orderId);
        }
        const prescription = await prescription_model_1.Prescription.create(prescriptionData);
        // If orderId is provided, update the order with the prescription ID
        if (orderId) {
            await order_model_1.Order.findByIdAndUpdate(orderId, {
                prescriptionId: prescription._id,
                prescriptionStatus: "pending",
            });
        }
        return prescription;
    },
    async getUserPrescriptions(userId) {
        return await prescription_model_1.Prescription.find({ userId }).sort({ createdAt: -1 });
    },
    async getPrescriptionById(id) {
        const prescription = await prescription_model_1.Prescription.findById(id);
        if (!prescription) {
            throw new ApiError_1.ApiError(404, "Prescription not found");
        }
        return prescription;
    },
    async updatePrescriptionStatus(id, status, notes) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const prescription = await prescription_model_1.Prescription.findByIdAndUpdate(id, { status, notes }, { new: true, session });
            if (!prescription) {
                throw new ApiError_1.ApiError(404, "Prescription not found");
            }
            // If the prescription is linked to an order, update the order's prescription status
            if (prescription.orderId) {
                await order_model_1.Order.findByIdAndUpdate(prescription.orderId, { prescriptionStatus: status }, { session });
                // Get the order and user to send email notification
                const order = await order_model_1.Order.findById(prescription.orderId);
                const user = await user_model_1.User.findById(prescription.userId);
                if (order && user) {
                    await email_service_1.emailService.sendPrescriptionStatusUpdate(order, user, status, notes);
                }
            }
            else {
                // If not linked to an order, still notify the user about the prescription status
                const user = await user_model_1.User.findById(prescription.userId);
                if (user) {
                    // Create a mock order object with minimal information for the email
                    const mockOrder = {
                        _id: prescription._id.toString(),
                        createdAt: prescription.createdAt,
                    };
                    await email_service_1.emailService.sendPrescriptionStatusUpdate(mockOrder, user, status, notes);
                }
            }
            await session.commitTransaction();
            return prescription;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    },
    async getAllPrescriptions(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const prescriptions = await prescription_model_1.Prescription.find(filters)
            .skip(skip)
            .limit(limit)
            .populate("userId", "name email")
            .populate("orderId")
            .sort({ createdAt: -1 });
        const total = await prescription_model_1.Prescription.countDocuments(filters);
        return {
            prescriptions,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
};
