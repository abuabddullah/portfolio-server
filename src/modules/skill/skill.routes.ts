import express from "express";
import { uploadSkillLogo } from "../../middlewares/upload.middleware";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createSkillController,
  deleteSkillController,
  getAllSkillsController,
  getSkillController,
  getSkillsByCategoryController,
  updateSkillController,
} from "./skill.controller";
import { updateSkillZodSchema } from "./skill.zod";

const router = express.Router();

// Public routes
router.get("/", getAllSkillsController);
router.get("/by-category", getSkillsByCategoryController);
router.get("/:id", getSkillController);

// Protected routes
// router.use(protect);
router.post("/", uploadSkillLogo, createSkillController);
router.patch(
  "/:id",
  uploadSkillLogo,
  validateRequest(updateSkillZodSchema),
  updateSkillController
);
router.delete("/:id", deleteSkillController);

export const skillRoutes = router;
