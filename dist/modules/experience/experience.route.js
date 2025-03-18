"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const experience_controller_1 = require("./experience.controller");
const router = express_1.default.Router();
router.post("/", experience_controller_1.ExperienceController.createExperience);
router.get("/", experience_controller_1.ExperienceController.getAllExperiences);
router.get("/:id", experience_controller_1.ExperienceController.getSingleExperience);
router.patch("/:id", experience_controller_1.ExperienceController.updateExperience);
router.delete("/:id", experience_controller_1.ExperienceController.deleteExperience);
exports.ExperienceRoutes = router;
