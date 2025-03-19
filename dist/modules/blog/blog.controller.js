"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogController = exports.updateBlogController = exports.getBlogController = exports.getAllBlogsController = exports.createBlogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const blog_service_1 = require("./blog.service");
// Create a new blog
exports.createBlogController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    // Add image URL if file was uploaded
    if (req.file) {
        req.body.image = req.file.path;
    }
    if (req.body.tags) {
        // Ensure that tags is always an array
        req.body.tags = req.body.tags
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0); // Optional: removes empty strings if any
    }
    const blog = await (0, blog_service_1.createBlog)(req.body);
    res.status(http_status_1.default.CREATED).json({
        status: "success",
        message: "Blog created successfully",
        data: blog,
    });
});
// Get all blogs
exports.getAllBlogsController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { searchTerm, tags, published } = req.query;
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const filters = {};
    if (searchTerm) {
        filters.searchTerm = searchTerm;
    }
    if (tags) {
        filters.tags = Array.isArray(tags) ? tags : [tags];
    }
    if (published !== undefined) {
        filters.published = published === "true";
    }
    const result = await (0, blog_service_1.getAllBlogs)(filters, page, limit);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: result.blogs,
        meta: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: Math.ceil(result.total / result.limit),
        },
    });
});
// Get a single blog
exports.getBlogController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const blog = await (0, blog_service_1.getBlogById)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: blog,
    });
});
// Update a blog
exports.updateBlogController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    // Add image URL if file was uploaded
    if (req.file) {
        req.body.image = req.file.path;
    }
    if (req.body.tags) {
        // Ensure that tags is always an array
        req.body.tags = req.body.tags
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0); // Optional: removes empty strings if any
    }
    const updatedBlog = await (0, blog_service_1.updateBlog)(id, req.body);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Blog updated successfully",
        data: updatedBlog,
    });
});
// Delete a blog
exports.deleteBlogController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    await (0, blog_service_1.deleteBlog)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Blog deleted successfully",
    });
});
