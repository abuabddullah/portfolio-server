"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResumeActive = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.getActiveResume = exports.getAllResumes = exports.createResume = void 0;
const http_status_1 = __importDefault(require("http-status"));
const resume_model_1 = require("./resume.model");
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
// Create a new resume
const createResume = async (resumeData) => {
    const newResume = await resume_model_1.Resume.create(resumeData);
    return newResume;
};
exports.createResume = createResume;
// Get all resumes
const getAllResumes = async () => {
    const resumes = await resume_model_1.Resume.find().sort({ createdAt: -1 });
    return resumes;
};
exports.getAllResumes = getAllResumes;
// Get active resume
const getActiveResume = async () => {
    const resume = await resume_model_1.Resume.findOne({ isActive: true });
    return resume;
};
exports.getActiveResume = getActiveResume;
// Get a single resume by ID
const getResumeById = async (id) => {
    const resume = await resume_model_1.Resume.findById(id);
    if (!resume) {
        throw new globalErrorHandler_1.AppError("Resume not found", http_status_1.default.NOT_FOUND);
    }
    return resume;
};
exports.getResumeById = getResumeById;
// Update a resume
const updateResume = async (id, updateData) => {
    const resume = await resume_model_1.Resume.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!resume) {
        throw new globalErrorHandler_1.AppError("Resume not found", http_status_1.default.NOT_FOUND);
    }
    return resume;
};
exports.updateResume = updateResume;
// Delete a resume
const deleteResume = async (id) => {
    const result = await resume_model_1.Resume.findByIdAndDelete(id);
    if (!result) {
        throw new globalErrorHandler_1.AppError("Resume not found", http_status_1.default.NOT_FOUND);
    }
};
exports.deleteResume = deleteResume;
// Set a resume as active
const setResumeActive = async (id) => {
    // First, set all resumes to inactive
    await resume_model_1.Resume.updateMany({}, { isActive: false });
    // Then, set the specified resume to active
    const resume = await resume_model_1.Resume.findByIdAndUpdate(id, { isActive: true }, { new: true });
    if (!resume) {
        throw new globalErrorHandler_1.AppError("Resume not found", http_status_1.default.NOT_FOUND);
    }
    return resume;
};
exports.setResumeActive = setResumeActive;
