"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
const project_model_1 = require("./project.model");
// Create a new project
const createProject = async (projectData) => {
    const newProject = await project_model_1.Project.create(projectData);
    return newProject;
};
exports.createProject = createProject;
// Get all projects with filtering and pagination
const getAllProjects = async (filters, page = 1, limit = 10) => {
    const { searchTerm, featured } = filters;
    // Build query
    const query = {};
    // Apply search filter
    if (searchTerm) {
        query.$text = { $search: searchTerm };
    }
    // Apply featured filter
    if (featured !== undefined) {
        query.featured = featured;
    }
    // Calculate pagination
    const skip = (page - 1) * limit;
    // Execute query
    const projects = await project_model_1.Project.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = await project_model_1.Project.countDocuments(query);
    return {
        projects,
        total,
        page,
        limit,
    };
};
exports.getAllProjects = getAllProjects;
// Get a single project by ID
const getProjectById = async (id) => {
    const project = await project_model_1.Project.findById(id);
    if (!project) {
        throw new globalErrorHandler_1.AppError("Project not found", http_status_1.default.NOT_FOUND);
    }
    return project;
};
exports.getProjectById = getProjectById;
// Update a project
const updateProject = async (id, updateData) => {
    const project = await project_model_1.Project.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!project) {
        throw new globalErrorHandler_1.AppError("Project not found", http_status_1.default.NOT_FOUND);
    }
    return project;
};
exports.updateProject = updateProject;
// Delete a project
const deleteProject = async (id) => {
    const result = await project_model_1.Project.findByIdAndDelete(id);
    if (!result) {
        throw new globalErrorHandler_1.AppError("Project not found", http_status_1.default.NOT_FOUND);
    }
};
exports.deleteProject = deleteProject;
