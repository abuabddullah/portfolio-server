"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResumeActiveController = exports.deleteResumeController = exports.updateResumeController = exports.getResumeController = exports.getActiveResumeController = exports.getAllResumesController = exports.createResumeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const resume_service_1 = require("./resume.service");
const catchAsync_1 = require("../../utils/catchAsync");
// Create a new resume
exports.createResumeController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    // Add file URL from upload
    if (req.file) {
        req.body.file = req.file.path;
    }
    else {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            status: "error",
            message: "Resume file is required",
        });
    }
    const resume = await (0, resume_service_1.createResume)(req.body);
    res.status(http_status_1.default.CREATED).json({
        status: "success",
        message: "Resume uploaded successfully",
        data: resume,
    });
});
// Get all resumes
exports.getAllResumesController = (0, catchAsync_1.catchAsync)(async (_req, res, _next) => {
    const resumes = await (0, resume_service_1.getAllResumes)();
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: resumes,
    });
});
// Get active resume
exports.getActiveResumeController = (0, catchAsync_1.catchAsync)(async (_req, res, _next) => {
    const resume = await (0, resume_service_1.getActiveResume)();
    if (!resume) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            status: "error",
            message: "No active resume found",
        });
    }
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: resume,
    });
});
// Get a single resume
exports.getResumeController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const resume = await (0, resume_service_1.getResumeById)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: resume,
    });
});
// Update a resume
exports.updateResumeController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    // Add file URL if file was uploaded
    if (req.file) {
        req.body.file = req.file.path;
    }
    const updatedResume = await (0, resume_service_1.updateResume)(id, req.body);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Resume updated successfully",
        data: updatedResume,
    });
});
// Delete a resume
exports.deleteResumeController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    await (0, resume_service_1.deleteResume)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Resume deleted successfully",
    });
});
// Set a resume as active
exports.setResumeActiveController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const resume = await (0, resume_service_1.setResumeActive)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Resume set as active successfully",
        data: resume,
    });
});
