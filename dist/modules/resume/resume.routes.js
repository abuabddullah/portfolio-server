"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const resume_controller_1 = require("./resume.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const resume_zod_1 = require("./resume.zod");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = express_1.default.Router();
// Public routes
router.get("/active", resume_controller_1.getActiveResumeController);
// Protected routes
router.use(auth_middleware_1.protect);
router.post("/", upload_middleware_1.uploadResume, (0, validateRequest_1.validateRequest)(resume_zod_1.createResumeZodSchema), resume_controller_1.createResumeController);
router.get("/", resume_controller_1.getAllResumesController);
router.get("/:id", resume_controller_1.getResumeController);
router.patch("/:id", upload_middleware_1.uploadResume, (0, validateRequest_1.validateRequest)(resume_zod_1.updateResumeZodSchema), resume_controller_1.updateResumeController);
router.delete("/:id", resume_controller_1.deleteResumeController);
router.patch("/:id/set-active", resume_controller_1.setResumeActiveController);
exports.resumeRoutes = router;
