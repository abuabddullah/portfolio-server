"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const isAdmin_1 = require("../../middlewares/isAdmin");
const upload_1 = require("../../middlewares/upload");
const medicine_controller_1 = require("./medicine.controller");
const router = express_1.default.Router();
router.get("/", medicine_controller_1.medicineController.getAllMedicines);
router.get("/manufacturers", medicine_controller_1.medicineController.getAllManufacturers);
router.get("/categories", medicine_controller_1.medicineController.getAllCategories);
router.get("/:id", medicine_controller_1.medicineController.getMedicineById);
router.post("/", (0, auth_1.auth)(), isAdmin_1.isAdmin, upload_1.upload.single("image"), 
// validateRequest(createMedicineSchema),
medicine_controller_1.medicineController.createMedicine);
router.patch("/:id", (0, auth_1.auth)(), isAdmin_1.isAdmin, upload_1.upload.single("image"), 
// validateRequest(updateMedicineSchema),
medicine_controller_1.medicineController.updateMedicine);
router.delete("/:id", (0, auth_1.auth)(), isAdmin_1.isAdmin, medicine_controller_1.medicineController.deleteMedicine);
exports.medicineRoutes = router;
