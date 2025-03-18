"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = void 0;
const mongoose_1 = require("mongoose");
// Create the schema
const experienceSchema = new mongoose_1.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    shortDuration: { type: String },
    image: { type: String, required: true },
    tasks: { type: [String], required: true },
});
// Create and export the model
exports.Experience = (0, mongoose_1.model)("Experience", experienceSchema);
