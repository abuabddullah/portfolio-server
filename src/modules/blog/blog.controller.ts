import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "./blog.service";

// Create a new blog
export const createBlogController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Add image URL if file was uploaded
    if (req.file) {
      req.body.image = req.file.path;
    }

    if (req.body.tags) {
      // Ensure that tags is always an array
      req.body.tags = req.body.tags
        .split(",")
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0); // Optional: removes empty strings if any
    }

    const blog = await createBlog(req.body);

    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "Blog created successfully",
      data: blog,
    });
  }
);

// Get all blogs
export const getAllBlogsController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { searchTerm, tags, published } = req.query;
    const page = Number.parseInt(req.query.page as string) || 1;
    const limit = Number.parseInt(req.query.limit as string) || 10;

    const filters: any = {};

    if (searchTerm) {
      filters.searchTerm = searchTerm as string;
    }

    if (tags) {
      filters.tags = Array.isArray(tags) ? tags : [tags as string];
    }

    if (published !== undefined) {
      filters.published = published === "true";
    }

    const result = await getAllBlogs(filters, page, limit);

    res.status(httpStatus.OK).json({
      status: "success",
      data: result.blogs,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  }
);

// Get a single blog
export const getBlogController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const blog = await getBlogById(id);

    res.status(httpStatus.OK).json({
      status: "success",
      data: blog,
    });
  }
);

// Update a blog
export const updateBlogController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    // Add image URL if file was uploaded
    if (req.file) {
      req.body.image = req.file.path;
    }

    if (req.body.tags) {
      // Ensure that tags is always an array
      req.body.tags = req.body.tags
        .split(",")
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0); // Optional: removes empty strings if any
    }

    const updatedBlog = await updateBlog(id, req.body);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  }
);

// Delete a blog
export const deleteBlogController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    await deleteBlog(id);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  }
);
