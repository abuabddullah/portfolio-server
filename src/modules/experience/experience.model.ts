import { Schema, model } from "mongoose";
import { IExperience } from "./experience.type";

// Create the schema
const experienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  shortDuration: { type: String },
  image: { type: String, required: true },
  tasks: { type: [String], required: true },
});

// Create and export the model
export const Experience = model<IExperience>("Experience", experienceSchema);
