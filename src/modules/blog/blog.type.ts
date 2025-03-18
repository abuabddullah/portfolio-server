export interface IBlog {
  _id?: string
  title: string
  content: string
  summary: string
  image?: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface IBlogFilters {
  searchTerm?: string
  tags?: string[]
  published?: boolean
}

