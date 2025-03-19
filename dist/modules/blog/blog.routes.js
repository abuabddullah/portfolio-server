"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
// Public routes
router.get("/", blog_controller_1.getAllBlogsController);
router.get("/:id", blog_controller_1.getBlogController);
// Protected routes
// router.use(protect);
router.post("/", blog_controller_1.createBlogController);
router.patch("/:id", blog_controller_1.updateBlogController);
router.delete("/:id", blog_controller_1.deleteBlogController);
exports.blogRoutes = router;
