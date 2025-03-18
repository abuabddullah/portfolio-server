"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const project_zod_1 = require("./project.zod");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = express_1.default.Router();
// Public routes
router.get("/", project_controller_1.getAllProjectsController);
router.get("/:id", project_controller_1.getProjectController);
// Protected routes
router.use(auth_middleware_1.protect);
router.post("/", upload_middleware_1.uploadProjectImage, (0, validateRequest_1.validateRequest)(project_zod_1.createProjectZodSchema), project_controller_1.createProjectController);
router.patch("/:id", upload_middleware_1.uploadProjectImage, (0, validateRequest_1.validateRequest)(project_zod_1.updateProjectZodSchema), project_controller_1.updateProjectController);
router.delete("/:id", project_controller_1.deleteProjectController);
exports.projectRoutes = router;
