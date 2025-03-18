export interface ISkill {
  _id?: string
  name: string
  category: string
  proficiency: number // 1-5 scale
  logo?: string
  description?: string
  order?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ISkillFilters {
  searchTerm?: string
  category?: string
}

