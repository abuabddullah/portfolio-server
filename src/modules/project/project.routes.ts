import express from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "./project.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { createProjectZodSchema, updateProjectZodSchema } from "./project.zod";
import { uploadProjectImage } from "../../middlewares/upload.middleware";

const router = express.Router();

// Public routes
router.get("/", getAllProjectsController);
router.get("/:id", getProjectController);

// Protected routes
router.use(protect);
router.post("/", uploadProjectImage, createProjectController);
router.patch("/:id", updateProjectController);
router.delete("/:id", deleteProjectController);

export const projectRoutes = router;
