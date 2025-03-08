import { ApiError } from "../../utils/ApiError"
import type { IMedicine } from "./medicine.interface"
import { Medicine } from "./medicine.model"

export const medicineService = {
  async createMedicine(medicineData: Partial<IMedicine>) {
    return await Medicine.create(medicineData)
  },

  async getAllMedicines(page = 1, limit = 10, filters: Record<string, any> = {}) {
    const skip = (page - 1) * limit
    const medicines = await Medicine.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 })

    const total = await Medicine.countDocuments(filters)

    return {
      medicines,
      meta: {
        page,
        limit,
        total,
      },
    }
  },

  async getMedicineById(id: string) {
    const medicine = await Medicine.findById(id)
    if (!medicine) {
      throw new ApiError(404, "Medicine not found")
    }
    return medicine
  },

  async updateMedicine(id: string, updateData: Partial<IMedicine>) {
    const medicine = await Medicine.findByIdAndUpdate(id, { $set: updateData }, { new: true })
    if (!medicine) {
      throw new ApiError(404, "Medicine not found")
    }
    return medicine
  },

  async deleteMedicine(id: string) {
    const medicine = await Medicine.findByIdAndDelete(id)
    if (!medicine) {
      throw new ApiError(404, "Medicine not found")
    }
    return medicine
  },

  async getAllManufacturers() {
    const manufacturers = await Medicine.distinct("manufacturer")
    return manufacturers
  },

  async getAllCategories() {
    const categories = await Medicine.distinct("category")
    return categories
  },
}

