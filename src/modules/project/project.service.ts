import httpStatus from "http-status"
import { Project } from "./project.model"
import type { IProject, IProjectFilters } from "./project.type"
import { AppError } from "../../middlewares/globalErrorHandler"

// Create a new project
export const createProject = async (projectData: IProject): Promise<IProject> => {
  const newProject = await Project.create(projectData)
  return newProject
}

// Get all projects with filtering and pagination
export const getAllProjects = async (
  filters: IProjectFilters,
  page = 1,
  limit = 10,
): Promise<{ projects: IProject[]; total: number; page: number; limit: number }> => {
  const { searchTerm, featured } = filters

  // Build query
  const query: any = {}

  // Apply search filter
  if (searchTerm) {
    query.$text = { $search: searchTerm }
  }

  // Apply featured filter
  if (featured !== undefined) {
    query.featured = featured
  }

  // Calculate pagination
  const skip = (page - 1) * limit

  // Execute query
  const projects = await Project.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit)

  const total = await Project.countDocuments(query)

  return {
    projects,
    total,
    page,
    limit,
  }
}

// Get a single project by ID
export const getProjectById = async (id: string): Promise<IProject> => {
  const project = await Project.findById(id)

  if (!project) {
    throw new AppError("Project not found", httpStatus.NOT_FOUND)
  }

  return project
}

// Update a project
export const updateProject = async (id: string, updateData: Partial<IProject>): Promise<IProject> => {
  const project = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!project) {
    throw new AppError("Project not found", httpStatus.NOT_FOUND)
  }

  return project
}

// Delete a project
export const deleteProject = async (id: string): Promise<void> => {
  const result = await Project.findByIdAndDelete(id)

  if (!result) {
    throw new AppError("Project not found", httpStatus.NOT_FOUND)
  }
}

