import httpStatus from "http-status"
import { Skill } from "./skill.model"
import type { ISkill, ISkillFilters } from "./skill.type"
import { AppError } from "../../middlewares/globalErrorHandler"

// Create a new skill
export const createSkill = async (skillData: ISkill): Promise<ISkill> => {
  const newSkill = await Skill.create(skillData)
  return newSkill
}

// Get all skills with filtering
export const getAllSkills = async (filters: ISkillFilters): Promise<ISkill[]> => {
  const { searchTerm, category } = filters

  // Build query
  const query: any = {}

  // Apply search filter
  if (searchTerm) {
    query.$text = { $search: searchTerm }
  }

  // Apply category filter
  if (category) {
    query.category = category
  }

  // Execute query
  const skills = await Skill.find(query).sort({ category: 1, order: 1, name: 1 })

  return skills
}

// Get skills grouped by category
export const getSkillsByCategory = async (): Promise<{ [key: string]: ISkill[] }> => {
  const skills = await Skill.find().sort({ order: 1, name: 1 })

  // Group skills by category
  const groupedSkills = skills.reduce((acc: { [key: string]: ISkill[] }, skill) => {
    const category = skill.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  return groupedSkills
}

// Get a single skill by ID
export const getSkillById = async (id: string): Promise<ISkill> => {
  const skill = await Skill.findById(id)

  if (!skill) {
    throw new AppError("Skill not found", httpStatus.NOT_FOUND)
  }

  return skill
}

// Update a skill
export const updateSkill = async (id: string, updateData: Partial<ISkill>): Promise<ISkill> => {
  const skill = await Skill.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!skill) {
    throw new AppError("Skill not found", httpStatus.NOT_FOUND)
  }

  return skill
}

// Delete a skill
export const deleteSkill = async (id: string): Promise<void> => {
  const result = await Skill.findByIdAndDelete(id)

  if (!result) {
    throw new AppError("Skill not found", httpStatus.NOT_FOUND)
  }
}

