export interface IProject {
  _id?: string;
  title: string;
  description: string;
  technologies?: string[];
  image?: string;
  category?: string;
  liveUrl?: string;
  githubUrlClient?: string;
  githubUrlServer?: string;
  featured?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProjectFilters {
  searchTerm?: string;
  featured?: boolean;
}
