import mongoose, { Schema } from "mongoose";
import type { IBlog } from "./blog.type";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    summary: {
      type: String,
      required: [true, "Blog summary is required"],
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
blogSchema.index({ title: "text", content: "text", summary: "text" });

// Pre-save middleware to set publishedAt date when blog is published
blogSchema.pre("save", function (next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export const Blog = mongoose.model<IBlog>("Blog", blogSchema);
