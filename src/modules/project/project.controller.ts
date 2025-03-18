import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "./project.service";

// Create a new project
export const createProjectController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // Add image URL if file was uploaded
    if (req.file) {
      req.body.image = req.file.path;
    }
    if (req.body.technologies) {
      // Ensure that technologies is always an array
      req.body.technologies = req.body.technologies
        .split(",")
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0); // Optional: removes empty strings if any
    }
    const project = await createProject(req.body);

    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "Project created successfully",
      data: project,
    });
  }
);

// Get all projects
export const getAllProjectsController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { searchTerm, featured } = req.query;
    const page = Number.parseInt(req.query.page as string) || 1;
    const limit = Number.parseInt(req.query.limit as string) || 10;

    const filters: any = {};

    if (searchTerm) {
      filters.searchTerm = searchTerm as string;
    }

    if (featured !== undefined) {
      filters.featured = featured === "true";
    }

    const result = await getAllProjects(filters, page, limit);

    res.status(httpStatus.OK).json({
      status: "success",
      data: result.projects,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: Math.ceil(result.total / result.limit),
      },
    });
  }
);

// Get a single project
export const getProjectController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const project = await getProjectById(id);

    res.status(httpStatus.OK).json({
      status: "success",
      data: project,
    });
  }
);

// Update a project
export const updateProjectController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;

    // Add image URL if file was uploaded
    if (req.file) {
      req.body.image = req.file.path;
    }

    const updatedProject = await updateProject(id, req.body);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Project updated successfully",
      data: updatedProject,
    });
  }
);

// Delete a project
export const deleteProjectController = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    await deleteProject(id);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Project deleted successfully",
    });
  }
);
