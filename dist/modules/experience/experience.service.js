"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceService = void 0;
const experience_model_1 = require("./experience.model");
const createExperience = async (payload) => {
    const result = await experience_model_1.Experience.create(payload);
    return result;
};
const getAllExperiences = async () => {
    const result = await experience_model_1.Experience.find();
    return result;
};
const getSingleExperience = async (id) => {
    const result = await experience_model_1.Experience.findById(id);
    return result;
};
const updateExperience = async (id, payload) => {
    const result = await experience_model_1.Experience.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteExperience = async (id) => {
    const result = await experience_model_1.Experience.findByIdAndDelete(id);
    return result;
};
exports.ExperienceService = {
    createExperience,
    getAllExperiences,
    getSingleExperience,
    updateExperience,
    deleteExperience,
};
