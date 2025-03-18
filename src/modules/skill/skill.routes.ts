import express from "express";
import {
  createSkillController,
  getAllSkillsController,
  getSkillsByCategoryController,
  getSkillController,
  updateSkillController,
  deleteSkillController,
} from "./skill.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { createSkillZodSchema, updateSkillZodSchema } from "./skill.zod";
import { uploadSkillLogo } from "../../middlewares/upload.middleware";

const router = express.Router();

// Public routes
router.get("/", getAllSkillsController);
router.get("/by-category", getSkillsByCategoryController);
router.get("/:id", getSkillController);

// Protected routes
router.use(protect);
router.post("/", uploadSkillLogo, createSkillController);
router.patch(
  "/:id",
  uploadSkillLogo,
  validateRequest(updateSkillZodSchema),
  updateSkillController
);
router.delete("/:id", deleteSkillController);

export const skillRoutes = router;
