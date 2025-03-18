"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("./../../utils/sendResponse"));
const experience_service_1 = require("./experience.service");
const createExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    if (req.body.tasks && typeof req.body.tasks === "string") {
        req.body.tasks = req.body.tasks
            .split(",")
            .map((task) => task.trim())
            .filter((task) => task.length > 0);
    }
    const result = await experience_service_1.ExperienceService.createExperience(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience created successfully",
        data: result,
    });
});
const getAllExperiences = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await experience_service_1.ExperienceService.getAllExperiences();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experiences retrieved successfully",
        data: result,
    });
});
const getSingleExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await experience_service_1.ExperienceService.getSingleExperience(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience retrieved successfully",
        data: result,
    });
});
const updateExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    if (req.body.tasks && typeof req.body.tasks === "string") {
        req.body.tasks = req.body.tasks
            .split(",")
            .map((task) => task.trim())
            .filter((task) => task.length > 0);
    }
    const result = await experience_service_1.ExperienceService.updateExperience(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience updated successfully",
        data: result,
    });
});
const deleteExperience = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await experience_service_1.ExperienceService.deleteExperience(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Experience deleted successfully",
        data: result,
    });
});
exports.ExperienceController = {
    createExperience,
    getAllExperiences,
    getSingleExperience,
    updateExperience,
    deleteExperience,
};
