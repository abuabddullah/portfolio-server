"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.getSkillById = exports.getSkillsByCategory = exports.getAllSkills = exports.createSkill = void 0;
const http_status_1 = __importDefault(require("http-status"));
const skill_model_1 = require("./skill.model");
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
// Create a new skill
const createSkill = async (skillData) => {
    const newSkill = await skill_model_1.Skill.create(skillData);
    return newSkill;
};
exports.createSkill = createSkill;
// Get all skills with filtering
const getAllSkills = async (filters) => {
    const { searchTerm, category } = filters;
    // Build query
    const query = {};
    // Apply search filter
    if (searchTerm) {
        query.$text = { $search: searchTerm };
    }
    // Apply category filter
    if (category) {
        query.category = category;
    }
    // Execute query
    const skills = await skill_model_1.Skill.find(query).sort({ category: 1, order: 1, name: 1 });
    return skills;
};
exports.getAllSkills = getAllSkills;
// Get skills grouped by category
const getSkillsByCategory = async () => {
    const skills = await skill_model_1.Skill.find().sort({ order: 1, name: 1 });
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {});
    return groupedSkills;
};
exports.getSkillsByCategory = getSkillsByCategory;
// Get a single skill by ID
const getSkillById = async (id) => {
    const skill = await skill_model_1.Skill.findById(id);
    if (!skill) {
        throw new globalErrorHandler_1.AppError("Skill not found", http_status_1.default.NOT_FOUND);
    }
    return skill;
};
exports.getSkillById = getSkillById;
// Update a skill
const updateSkill = async (id, updateData) => {
    const skill = await skill_model_1.Skill.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!skill) {
        throw new globalErrorHandler_1.AppError("Skill not found", http_status_1.default.NOT_FOUND);
    }
    return skill;
};
exports.updateSkill = updateSkill;
// Delete a skill
const deleteSkill = async (id) => {
    const result = await skill_model_1.Skill.findByIdAndDelete(id);
    if (!result) {
        throw new globalErrorHandler_1.AppError("Skill not found", http_status_1.default.NOT_FOUND);
    }
};
exports.deleteSkill = deleteSkill;
