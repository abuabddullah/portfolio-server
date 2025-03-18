import express from "express";
import { ExperienceController } from "./experience.controller";

const router = express.Router();

router.post("/", ExperienceController.createExperience);
router.get("/", ExperienceController.getAllExperiences);
router.get("/:id", ExperienceController.getSingleExperience);
router.patch("/:id", ExperienceController.updateExperience);
router.delete("/:id", ExperienceController.deleteExperience);

export const ExperienceRoutes = router;
