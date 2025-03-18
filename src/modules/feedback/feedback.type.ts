export interface IFeedback {
  _id?: string
  name: string
  company?: string
  position?: string
  message: string
  rating: number // 1-5 scale
  isVisible: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface IFeedbackFilters {
  isVisible?: boolean
}

