import mongoose, { Schema } from "mongoose";
import type { IProject } from "./project.type";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    technologies: {
      type: [String],
      required: [false, "Technologies are required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    image: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    githubUrlServer: {
      type: String,
    },
    githubUrlClient: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
projectSchema.index({ title: "text", description: "text" });

export const Project = mongoose.model<IProject>("Project", projectSchema);
