import mongoose, { Schema } from "mongoose"
import type { ISkill } from "./skill.type"

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Skill category is required"],
      trim: true,
    },
    proficiency: {
      type: Number,
      required: [true, "Proficiency level is required"],
      min: 1,
      max: 5,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for better search performance
skillSchema.index({ name: "text", category: "text", description: "text" })

export const Skill = mongoose.model<ISkill>("Skill", skillSchema)

