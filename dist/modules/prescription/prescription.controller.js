"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const prescription_service_1 = require("./prescription.service");
exports.prescriptionController = {
    uploadPrescription: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a, _b;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const imageURL = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        if (!imageURL) {
            return res.status(400).json({
                success: false,
                message: "Prescription image is required",
            });
        }
        const prescription = await prescription_service_1.prescriptionService.uploadPrescription(userId, imageURL, req.body.orderId);
        res.status(201).json({
            success: true,
            message: "Prescription uploaded successfully",
            data: prescription,
        });
    }),
    getUserPrescriptions: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        var _a;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const prescriptions = await prescription_service_1.prescriptionService.getUserPrescriptions(userId);
        res.status(200).json({
            success: true,
            data: prescriptions,
        });
    }),
    getPrescriptionById: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const prescription = await prescription_service_1.prescriptionService.getPrescriptionById(req.params.id);
        res.status(200).json({
            success: true,
            data: prescription,
        });
    }),
    updatePrescriptionStatus: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const { id } = req.params;
        const { status, notes } = req.body;
        const prescription = await prescription_service_1.prescriptionService.updatePrescriptionStatus(id, status, notes);
        res.status(200).json({
            success: true,
            message: "Prescription status updated successfully",
            data: prescription,
        });
    }),
    getAllPrescriptions: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const status = req.query.status;
        const filters = {};
        if (status)
            filters.status = status;
        const prescriptions = await prescription_service_1.prescriptionService.getAllPrescriptions(page, limit, filters);
        res.status(200).json({
            success: true,
            data: prescriptions,
        });
    }),
};
