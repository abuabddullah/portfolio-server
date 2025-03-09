"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const isAdmin_1 = require("../../middlewares/isAdmin");
const upload_1 = require("../../middlewares/upload");
const validateRequest_1 = require("../../middlewares/validateRequest");
const prescription_controller_1 = require("./prescription.controller");
const prescription_validation_1 = require("./prescription.validation");
const router = express_1.default.Router();
router.post("/upload", (0, auth_1.auth)(), upload_1.upload.single("prescription"), prescription_controller_1.prescriptionController.uploadPrescription);
router.get("/my-prescriptions", (0, auth_1.auth)(), prescription_controller_1.prescriptionController.getUserPrescriptions);
router.get("/:id", (0, auth_1.auth)(), prescription_controller_1.prescriptionController.getPrescriptionById);
router.patch("/:id/status", (0, auth_1.auth)(), isAdmin_1.isAdmin, (0, validateRequest_1.validateRequest)(prescription_validation_1.updatePrescriptionStatusSchema), prescription_controller_1.prescriptionController.updatePrescriptionStatus);
router.get("/", (0, auth_1.auth)(), isAdmin_1.isAdmin, prescription_controller_1.prescriptionController.getAllPrescriptions);
exports.prescriptionRoutes = router;
