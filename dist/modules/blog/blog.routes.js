"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const blog_zod_1 = require("./blog.zod");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = express_1.default.Router();
// Public routes
router.get("/", blog_controller_1.getAllBlogsController);
router.get("/:id", blog_controller_1.getBlogController);
// Protected routes
router.use(auth_middleware_1.protect);
router.post("/", upload_middleware_1.uploadBlogImage, (0, validateRequest_1.validateRequest)(blog_zod_1.createBlogZodSchema), blog_controller_1.createBlogController);
router.patch("/:id", upload_middleware_1.uploadBlogImage, (0, validateRequest_1.validateRequest)(blog_zod_1.updateBlogZodSchema), blog_controller_1.updateBlogController);
router.delete("/:id", blog_controller_1.deleteBlogController);
exports.blogRoutes = router;
