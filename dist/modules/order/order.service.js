"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = require("../../utils/ApiError");
const email_service_1 = require("../../utils/email.service");
const medicine_model_1 = require("../medicine/medicine.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
exports.orderService = {
    async createOrder(userId, orderData) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const { items } = orderData;
            let totalPrice = 0;
            let requiresPrescription = false;
            // Verify stock and calculate total price
            for (const item of items) {
                const medicine = await medicine_model_1.Medicine.findById(item.medicineId).session(session);
                if (!medicine) {
                    throw new ApiError_1.ApiError(404, `Medicine not found: ${item.medicineId}`);
                }
                if (medicine.stock < item.quantity) {
                    throw new ApiError_1.ApiError(400, `Insufficient stock for medicine: ${medicine.name}`);
                }
                // Update stock
                await medicine_model_1.Medicine.findByIdAndUpdate(item.medicineId, { $inc: { stock: -item.quantity } }, { session });
                // Check if stock is low after this order
                if (medicine.stock - item.quantity <= 10) {
                    // Get admin emails to send alert
                    const adminUsers = await user_model_1.User.find({ role: "admin" });
                    const adminEmails = adminUsers.map((admin) => admin.email);
                    // Send low stock alert email
                    if (adminEmails.length > 0) {
                        email_service_1.emailService.sendLowStockAlert(medicine.name, medicine.stock - item.quantity, adminEmails);
                    }
                }
                item.price = medicine.price;
                item.requiresPrescription = medicine.requiresPrescription;
                totalPrice += medicine.price * item.quantity;
                // Check if any medicine requires prescription
                if (medicine.requiresPrescription) {
                    requiresPrescription = true;
                }
            }
            const orderToCreate = {
                ...orderData,
                userId,
                totalPrice,
                status: "pending",
                paymentStatus: "pending",
                prescriptionStatus: requiresPrescription ? "pending" : "not_required",
            };
            const order = await order_model_1.Order.create([orderToCreate], { session });
            await session.commitTransaction();
            // Send order confirmation email
            const user = await user_model_1.User.findById(userId);
            if (user) {
                await email_service_1.emailService.sendOrderConfirmation(order[0], user);
            }
            return order[0];
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    },
    async getUserOrders(userId) {
        return await order_model_1.Order.find({ userId })
            .populate("items.medicineId")
            .populate("prescriptionId")
            .sort({ createdAt: -1 });
    },
    async getOrderById(orderId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const order = await order_model_1.Order.findById(orderId)
            .skip(skip)
            .limit(limit)
            .populate("items.medicineId")
            .populate("prescriptionId");
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        const total = await order_model_1.Order.countDocuments({ _id: orderId });
        return {
            order,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
    async updateOrderStatus(orderId, status) {
        const order = await order_model_1.Order.findById(orderId);
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        if (order.status === "cancelled") {
            throw new ApiError_1.ApiError(400, "Cannot update cancelled order");
        }
        // If order requires prescription and it's not approved, don't allow shipping
        if ((status === "shipped" || status === "delivered") &&
            order.prescriptionStatus === "pending") {
            throw new ApiError_1.ApiError(400, "Cannot ship or deliver order with pending prescription");
        }
        if ((status === "shipped" || status === "delivered") &&
            order.prescriptionStatus === "rejected") {
            throw new ApiError_1.ApiError(400, "Cannot ship or deliver order with rejected prescription");
        }
        order.status = status;
        await order.save();
        // Send order status update email
        const user = await user_model_1.User.findById(order.userId);
        if (user) {
            await email_service_1.emailService.sendOrderStatusUpdate(order, user);
        }
        return order;
    },
    async cancelOrder(orderId, userId) {
        const order = await order_model_1.Order.findOne({ _id: orderId, userId });
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        if (order.status !== "pending" && order.status !== "processing") {
            throw new ApiError_1.ApiError(400, "Can only cancel pending or processing orders");
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Restore stock
            for (const item of order.items) {
                await medicine_model_1.Medicine.findByIdAndUpdate(item.medicineId, { $inc: { stock: item.quantity } }, { session });
            }
            order.status = "cancelled";
            await order.save({ session });
            await session.commitTransaction();
            // Send order cancellation email
            const user = await user_model_1.User.findById(userId);
            if (user) {
                await email_service_1.emailService.sendOrderStatusUpdate(order, user);
            }
            return order;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    },
    async getAllOrders(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const orders = await order_model_1.Order.find(filters)
            .skip(skip)
            .limit(limit)
            .populate("items.medicineId")
            .populate("userId")
            .populate("prescriptionId")
            .sort({ createdAt: -1 });
        const total = await order_model_1.Order.countDocuments(filters);
        return {
            orders,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
    async updateOrderPrescriptionStatus(orderId, orderPrescriptionStatus) {
        const order = await order_model_1.Order.findById(orderId);
        if (!order) {
            throw new ApiError_1.ApiError(404, "Order not found");
        }
        else if (order.prescriptionStatus === "not_required") {
            throw new ApiError_1.ApiError(400, "Prescription not required for this order");
        }
        else if (order.prescriptionStatus === "approved") {
            throw new ApiError_1.ApiError(400, "Prescription already approved");
        }
        else if (order.prescriptionStatus === "rejected") {
            throw new ApiError_1.ApiError(400, "Prescription already rejected");
        }
        else {
            order.prescriptionStatus = orderPrescriptionStatus;
            await order.save();
            return order;
        }
    },
};
