"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const http_status_1 = __importDefault(require("http-status"));
const blog_model_1 = require("./blog.model");
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
// Create a new blog
const createBlog = async (blogData) => {
    const newBlog = await blog_model_1.Blog.create(blogData);
    return newBlog;
};
exports.createBlog = createBlog;
// Get all blogs with filtering and pagination
const getAllBlogs = async (filters, page = 1, limit = 10) => {
    const { searchTerm, tags, published } = filters;
    // Build query
    const query = {};
    // Apply search filter
    if (searchTerm) {
        query.$text = { $search: searchTerm };
    }
    // Apply tags filter
    if (tags && tags.length > 0) {
        query.tags = { $in: tags };
    }
    // Apply published filter
    if (published !== undefined) {
        query.published = published;
    }
    // Calculate pagination
    const skip = (page - 1) * limit;
    // Execute query
    const blogs = await blog_model_1.Blog.find(query).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit);
    const total = await blog_model_1.Blog.countDocuments(query);
    return {
        blogs,
        total,
        page,
        limit,
    };
};
exports.getAllBlogs = getAllBlogs;
// Get a single blog by ID
const getBlogById = async (id) => {
    const blog = await blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new globalErrorHandler_1.AppError("Blog not found", http_status_1.default.NOT_FOUND);
    }
    return blog;
};
exports.getBlogById = getBlogById;
// Update a blog
const updateBlog = async (id, updateData) => {
    // If setting to published and no publishedAt date, set it
    if (updateData.published && !updateData.publishedAt) {
        updateData.publishedAt = new Date();
    }
    const blog = await blog_model_1.Blog.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!blog) {
        throw new globalErrorHandler_1.AppError("Blog not found", http_status_1.default.NOT_FOUND);
    }
    return blog;
};
exports.updateBlog = updateBlog;
// Delete a blog
const deleteBlog = async (id) => {
    const result = await blog_model_1.Blog.findByIdAndDelete(id);
    if (!result) {
        throw new globalErrorHandler_1.AppError("Blog not found", http_status_1.default.NOT_FOUND);
    }
};
exports.deleteBlog = deleteBlog;
