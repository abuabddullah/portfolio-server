"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectController = exports.updateProjectController = exports.getProjectController = exports.getAllProjectsController = exports.createProjectController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const project_service_1 = require("./project.service");
// Create a new project
exports.createProjectController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    // Add image URL if file was uploaded
    if (req.file) {
        req.body.image = req.file.path;
    }
    if (req.body.technologies) {
        // Ensure that technologies is always an array
        req.body.technologies = req.body.technologies
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0); // Optional: removes empty strings if any
    }
    const project = await (0, project_service_1.createProject)(req.body);
    res.status(http_status_1.default.CREATED).json({
        status: "success",
        message: "Project created successfully",
        data: project,
    });
});
// Get all projects
exports.getAllProjectsController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { searchTerm, featured } = req.query;
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 10;
    const filters = {};
    if (searchTerm) {
        filters.searchTerm = searchTerm;
    }
    if (featured !== undefined) {
        filters.featured = featured === "true";
    }
    const result = await (0, project_service_1.getAllProjects)(filters, page, limit);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: result.projects,
        meta: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: Math.ceil(result.total / result.limit),
        },
    });
});
// Get a single project
exports.getProjectController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const project = await (0, project_service_1.getProjectById)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: project,
    });
});
// Update a project
exports.updateProjectController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    // Add image URL if file was uploaded
    if (req.file) {
        req.body.image = req.file.path;
    }
    const updatedProject = await (0, project_service_1.updateProject)(id, req.body);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Project updated successfully",
        data: updatedProject,
    });
});
// Delete a project
exports.deleteProjectController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    await (0, project_service_1.deleteProject)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Project deleted successfully",
    });
});
