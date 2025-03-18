"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkillController = exports.updateSkillController = exports.getSkillController = exports.getSkillsByCategoryController = exports.getAllSkillsController = exports.createSkillController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const skill_service_1 = require("./skill.service");
const catchAsync_1 = require("../../utils/catchAsync");
// Create a new skill
exports.createSkillController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    // Add logo URL if file was uploaded
    if (req.file) {
        req.body.logo = req.file.path;
    }
    const skill = await (0, skill_service_1.createSkill)(req.body);
    res.status(http_status_1.default.CREATED).json({
        status: "success",
        message: "Skill created successfully",
        data: skill,
    });
});
// Get all skills
exports.getAllSkillsController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { searchTerm, category } = req.query;
    const filters = {};
    if (searchTerm) {
        filters.searchTerm = searchTerm;
    }
    if (category) {
        filters.category = category;
    }
    const skills = await (0, skill_service_1.getAllSkills)(filters);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: skills,
    });
});
// Get skills grouped by category
exports.getSkillsByCategoryController = (0, catchAsync_1.catchAsync)(async (_req, res, _next) => {
    const groupedSkills = await (0, skill_service_1.getSkillsByCategory)();
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: groupedSkills,
    });
});
// Get a single skill
exports.getSkillController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    const skill = await (0, skill_service_1.getSkillById)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: skill,
    });
});
// Update a skill
exports.updateSkillController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    // Add logo URL if file was uploaded
    if (req.file) {
        req.body.logo = req.file.path;
    }
    const updatedSkill = await (0, skill_service_1.updateSkill)(id, req.body);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Skill updated successfully",
        data: updatedSkill,
    });
});
// Delete a skill
exports.deleteSkillController = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { id } = req.params;
    await (0, skill_service_1.deleteSkill)(id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Skill deleted successfully",
    });
});
