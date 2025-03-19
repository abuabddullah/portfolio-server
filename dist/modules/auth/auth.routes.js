"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_zod_1 = require("./auth.zod");
const router = express_1.default.Router();
// Public routes
router.post("/register", (0, validateRequest_1.validateRequest)(auth_zod_1.registerZodSchema), auth_controller_1.register);
router.post("/login", (0, validateRequest_1.validateRequest)(auth_zod_1.loginZodSchema), auth_controller_1.login);
router.get("/logout", auth_controller_1.logout);
// Protected routes
// router.use(protect)
router.get("/me", auth_controller_1.getMe);
router.patch("/update-profile", (0, validateRequest_1.validateRequest)(auth_zod_1.updateProfileZodSchema), auth_controller_1.updateUserProfile);
exports.authRoutes = router;
