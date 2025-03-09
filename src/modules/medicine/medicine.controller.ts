import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { deleteFromCloudinary } from "../../utils/cloudinary";
import { Medicine } from "./medicine.model";
import { medicineService } from "./medicine.service";

export const medicineController = {
  createMedicine: catchAsync(async (req: Request, res: Response) => {
    try {
      const imageURL = req.file ? req.file.path : req.body.imageURL;

      const medicineData = { ...req.body, imageURL };

      const medicine = await Medicine.create(medicineData);

      res.status(201).json({
        success: true,
        message: "Medicine created",
        data: medicine,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Medicine not created" });
    }
  }),

  updateMedicine: catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Convert string to boolean if present
    if (typeof updateData.requiresPrescription === "string") {
      updateData.requiresPrescription =
        updateData.requiresPrescription.toLowerCase() === "true";
    }

    const newImageUrl = req.file ? req.file.path : req.body.imageURL;

    const medicine = await medicineService.getMedicineById(id);
    if (medicine?.imageURL) {
      await deleteFromCloudinary(medicine.imageURL);
    }

    updateData.imageURL = newImageUrl;

    const updatedMedicine = await medicineService.updateMedicine(
      id,
      updateData
    );

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: updatedMedicine,
    });
  }),

  getAllMedicines: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const {
        category,
        manufacturer,
        search,
        minPrice,
        maxPrice,
        requiresPrescription,
      } = req.query;
      const filters: Record<string, any> = {};

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
              $in:
                typeof manufacturer === "string" ? manufacturer.split(",") : [],
            };
      }
      if (search) {
        filters.name = { $regex: search, $options: "i" }; // Case-insensitive search
      }
      if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
      }
      if (requiresPrescription !== undefined) {
        filters.requiresPrescription = requiresPrescription === "true";
      }

      const result = await medicineService.getAllMedicines(
        page,
        limit,
        filters
      );

      res.status(200).json({
        success: true,
        message: "Medicines retrieved successfully",
        data: result.medicines,
        meta: result.meta,
      });
    }
  ),

  getMedicineById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const medicine = await medicineService.getMedicineById(req.params.id);
      res.status(200).json({
        success: true,
        data: medicine,
      });
    }
  ),

  deleteMedicine: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await medicineService.deleteMedicine(req.params.id);
      res.status(200).json({
        success: true,
        message: "Medicine deleted successfully",
      });
    }
  ),

  getAllManufacturers: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const manufacturers = await medicineService.getAllManufacturers();
      res.status(200).json({
        success: true,
        message: "Manufacturers retrieved successfully",
        data: manufacturers,
      });
    }
  ),

  getAllCategories: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const categories = await medicineService.getAllCategories();
      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        data: categories,
      });
    }
  ),
};
