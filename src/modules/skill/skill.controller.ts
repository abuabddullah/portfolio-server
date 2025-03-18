import type { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
import { createSkill, getAllSkills, getSkillsByCategory, getSkillById, updateSkill, deleteSkill } from "./skill.service"
import { catchAsync } from "../../utils/catchAsync"

// Create a new skill
export const createSkillController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  // Add logo URL if file was uploaded
  if (req.file) {
    req.body.logo = req.file.path
  }

  const skill = await createSkill(req.body)

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Skill created successfully",
    data: skill,
  })
})

// Get all skills
export const getAllSkillsController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { searchTerm, category } = req.query

  const filters: any = {}

  if (searchTerm) {
    filters.searchTerm = searchTerm as string
  }

  if (category) {
    filters.category = category as string
  }

  const skills = await getAllSkills(filters)

  res.status(httpStatus.OK).json({
    status: "success",
    data: skills,
  })
})

// Get skills grouped by category
export const getSkillsByCategoryController = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const groupedSkills = await getSkillsByCategory()

  res.status(httpStatus.OK).json({
    status: "success",
    data: groupedSkills,
  })
})

// Get a single skill
export const getSkillController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const skill = await getSkillById(id)

  res.status(httpStatus.OK).json({
    status: "success",
    data: skill,
  })
})

// Update a skill
export const updateSkillController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params

  // Add logo URL if file was uploaded
  if (req.file) {
    req.body.logo = req.file.path
  }

  const updatedSkill = await updateSkill(id, req.body)

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Skill updated successfully",
    data: updatedSkill,
  })
})

// Delete a skill
export const deleteSkillController = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  await deleteSkill(id)

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Skill deleted successfully",
  })
})

