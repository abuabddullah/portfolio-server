"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const cloudinary_1 = require("../../utils/cloudinary");
const medicine_model_1 = require("./medicine.model");
const medicine_service_1 = require("./medicine.service");
exports.medicineController = {
    createMedicine: (0, catchAsync_1.catchAsync)(async (req, res) => {
        try {
            const imageURL = req.file
                ? req.file.path
                : "https://i.ibb.co.com/NdXcLBdJ/image.png";
            const medicineData = { ...req.body, imageURL };
            const medicine = await medicine_model_1.Medicine.create(medicineData);
            res.status(201).json({
                success: true,
                message: "Medicine created",
                data: medicine,
            });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Medicine not created" });
        }
    }),
    updateMedicine: (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const updateData = { ...req.body };
        // Convert string to boolean if present
        if (typeof updateData.requiresPrescription === "string") {
            updateData.requiresPrescription =
                updateData.requiresPrescription.toLowerCase() === "true";
        }
        if (req.file) {
            const newImageUrl = req.file.path;
            const medicine = await medicine_service_1.medicineService.getMedicineById(id);
            if (medicine === null || medicine === void 0 ? void 0 : medicine.imageURL) {
                await (0, cloudinary_1.deleteFromCloudinary)(medicine.imageURL);
            }
            updateData.imageURL = newImageUrl;
        }
        const updatedMedicine = await medicine_service_1.medicineService.updateMedicine(id, updateData);
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: updatedMedicine,
        });
    }),
    getAllMedicines: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { category, manufacturer, search, minPrice, maxPrice, requiresPrescription, } = req.query;
        const filters = {};
        // Handle both array and string cases
        // if (category) {
        //   filters.category = Array.isArray(category)
        //     ? { $in: category }
        //     : { $in: category.split(",") };
        // }
        // if (manufacturer) {
        //   filters.manufacturer = Array.isArray(manufacturer)
        //     ? { $in: manufacturer }
        //     : { $in: manufacturer.split(",") };
        // }
        if (category) {
            filters.category = Array.isArray(category)
                ? { $in: category }
                : { $in: typeof category === "string" ? category.split(",") : [] };
        }
        if (manufacturer) {
            filters.manufacturer = Array.isArray(manufacturer)
                ? { $in: manufacturer }
                : {
                    $in: typeof manufacturer === "string" ? manufacturer.split(",") : [],
                };
        }
        if (search) {
            filters.name = { $regex: search, $options: "i" }; // Case-insensitive search
        }
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice)
                filters.price.$gte = Number(minPrice);
            if (maxPrice)
                filters.price.$lte = Number(maxPrice);
        }
        if (requiresPrescription !== undefined) {
            filters.requiresPrescription = requiresPrescription === "true";
        }
        const result = await medicine_service_1.medicineService.getAllMedicines(page, limit, filters);
        res.status(200).json({
            success: true,
            message: "Medicines retrieved successfully",
            data: result.medicines,
            meta: result.meta,
        });
    }),
    getMedicineById: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const medicine = await medicine_service_1.medicineService.getMedicineById(req.params.id);
        res.status(200).json({
            success: true,
            data: medicine,
        });
    }),
    deleteMedicine: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        await medicine_service_1.medicineService.deleteMedicine(req.params.id);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
        });
    }),
    getAllManufacturers: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const manufacturers = await medicine_service_1.medicineService.getAllManufacturers();
        res.status(200).json({
            success: true,
            message: "Manufacturers retrieved successfully",
            data: manufacturers,
        });
    }),
    getAllCategories: (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const categories = await medicine_service_1.medicineService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories,
        });
    }),
};
