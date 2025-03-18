import httpStatus from "http-status"
import { Blog } from "./blog.model"
import type { IBlog, IBlogFilters } from "./blog.type"
import { AppError } from "../../middlewares/globalErrorHandler"

// Create a new blog
export const createBlog = async (blogData: IBlog): Promise<IBlog> => {
  const newBlog = await Blog.create(blogData)
  return newBlog
}

// Get all blogs with filtering and pagination
export const getAllBlogs = async (
  filters: IBlogFilters,
  page = 1,
  limit = 10,
): Promise<{ blogs: IBlog[]; total: number; page: number; limit: number }> => {
  const { searchTerm, tags, published } = filters

  // Build query
  const query: any = {}

  // Apply search filter
  if (searchTerm) {
    query.$text = { $search: searchTerm }
  }

  // Apply tags filter
  if (tags && tags.length > 0) {
    query.tags = { $in: tags }
  }

  // Apply published filter
  if (published !== undefined) {
    query.published = published
  }

  // Calculate pagination
  const skip = (page - 1) * limit

  // Execute query
  const blogs = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit)

  const total = await Blog.countDocuments(query)

  return {
    blogs,
    total,
    page,
    limit,
  }
}

// Get a single blog by ID
export const getBlogById = async (id: string): Promise<IBlog> => {
  const blog = await Blog.findById(id)

  if (!blog) {
    throw new AppError("Blog not found", httpStatus.NOT_FOUND)
  }

  return blog
}

// Update a blog
export const updateBlog = async (id: string, updateData: Partial<IBlog>): Promise<IBlog> => {
  // If setting to published and no publishedAt date, set it
  if (updateData.published && !updateData.publishedAt) {
    updateData.publishedAt = new Date()
  }

  const blog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!blog) {
    throw new AppError("Blog not found", httpStatus.NOT_FOUND)
  }

  return blog
}

// Delete a blog
export const deleteBlog = async (id: string): Promise<void> => {
  const result = await Blog.findByIdAndDelete(id)

  if (!result) {
    throw new AppError("Blog not found", httpStatus.NOT_FOUND)
  }
}

