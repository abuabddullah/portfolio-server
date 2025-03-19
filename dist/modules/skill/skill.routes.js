"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRoutes = void 0;
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const skill_controller_1 = require("./skill.controller");
const skill_zod_1 = require("./skill.zod");
const router = express_1.default.Router();
// Public routes
router.get("/", skill_controller_1.getAllSkillsController);
router.get("/by-category", skill_controller_1.getSkillsByCategoryController);
router.get("/:id", skill_controller_1.getSkillController);
// Protected routes
// router.use(protect);
router.post("/", upload_middleware_1.uploadSkillLogo, skill_controller_1.createSkillController);
router.patch("/:id", upload_middleware_1.uploadSkillLogo, (0, validateRequest_1.validateRequest)(skill_zod_1.updateSkillZodSchema), skill_controller_1.updateSkillController);
router.delete("/:id", skill_controller_1.deleteSkillController);
exports.skillRoutes = router;
