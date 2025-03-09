"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const medicine_model_1 = require("./medicine.model");
exports.medicineService = {
    async createMedicine(medicineData) {
        return await medicine_model_1.Medicine.create(medicineData);
    },
    async getAllMedicines(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const medicines = await medicine_model_1.Medicine.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await medicine_model_1.Medicine.countDocuments(filters);
        return {
            medicines,
            meta: {
                page,
                limit,
                total,
            },
        };
    },
    async getMedicineById(id) {
        const medicine = await medicine_model_1.Medicine.findById(id);
        if (!medicine) {
            throw new ApiError_1.ApiError(404, "Medicine not found");
        }
        return medicine;
    },
    async updateMedicine(id, updateData) {
        const medicine = await medicine_model_1.Medicine.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!medicine) {
            throw new ApiError_1.ApiError(404, "Medicine not found");
        }
        return medicine;
    },
    async deleteMedicine(id) {
        const medicine = await medicine_model_1.Medicine.findByIdAndDelete(id);
        if (!medicine) {
            throw new ApiError_1.ApiError(404, "Medicine not found");
        }
        return medicine;
    },
    async getAllManufacturers() {
        const manufacturers = await medicine_model_1.Medicine.distinct("manufacturer");
        return manufacturers;
    },
    async getAllCategories() {
        const categories = await medicine_model_1.Medicine.distinct("category");
        return categories;
    },
};
