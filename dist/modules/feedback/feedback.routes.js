"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const feedback_zod_1 = require("./feedback.zod");
const router = express_1.default.Router();
// Public routes
router.get("/", feedback_controller_1.getAllFeedbackController);
router.post("/", (0, validateRequest_1.validateRequest)(feedback_zod_1.createFeedbackZodSchema), feedback_controller_1.createFeedbackController);
// Protected routes
// router.use(protect)
router.get("/:id", feedback_controller_1.getFeedbackController);
router.patch("/:id", (0, validateRequest_1.validateRequest)(feedback_zod_1.updateFeedbackZodSchema), feedback_controller_1.updateFeedbackController);
router.delete("/:id", feedback_controller_1.deleteFeedbackController);
exports.feedbackRoutes = router;
