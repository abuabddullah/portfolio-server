import express from "express"
import { auth } from "../../middlewares/auth"
import { isAdmin } from "../../middlewares/isAdmin"
import { upload } from "../../middlewares/upload"
import { validateRequest } from "../../middlewares/validateRequest"
import { prescriptionController } from "./prescription.controller"
import { updatePrescriptionStatusSchema } from "./prescription.validation"

const router = express.Router()

router.post("/upload", auth(), upload.single("prescription"), prescriptionController.uploadPrescription)

router.get("/my-prescriptions", auth(), prescriptionController.getUserPrescriptions)
router.get("/:id", auth(), prescriptionController.getPrescriptionById)

router.patch(
  "/:id/status",
  auth(),
  isAdmin,
  validateRequest(updatePrescriptionStatusSchema),
  prescriptionController.updatePrescriptionStatus,
)

router.get("/", auth(), isAdmin, prescriptionController.getAllPrescriptions)

export const prescriptionRoutes = router

