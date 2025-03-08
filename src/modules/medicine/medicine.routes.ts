import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { upload } from "../../middlewares/upload";
import { validateRequest } from "../../middlewares/validateRequest";
import { medicineController } from "./medicine.controller";
import { updateMedicineSchema } from "./medicine.validation";

const router = express.Router();

router.get("/", medicineController.getAllMedicines);

router.get("/manufacturers", medicineController.getAllManufacturers);
router.get("/categories", medicineController.getAllCategories);
router.get("/:id", medicineController.getMedicineById);

router.post(
  "/",
  auth(),
  isAdmin,
  upload.single("image"),
  // validateRequest(createMedicineSchema),
  medicineController.createMedicine
);

router.patch(
  "/:id",
  auth(),
  isAdmin,
  upload.single("image"),
  // validateRequest(updateMedicineSchema),
  medicineController.updateMedicine
);

router.delete("/:id", auth(), isAdmin, medicineController.deleteMedicine);

export const medicineRoutes = router;
