Here's a comprehensive list of all APIs in your portfolio backend project, including request and response formats:

## Authentication APIs

### 1. Register Admin User

```plaintext
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 2. Login

```plaintext
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

### 3. Logout

```plaintext
GET /api/v1/auth/logout
```

**Response:**

```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

### 4. Get Current User

```plaintext
GET /api/v1/auth/me
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 5. Update Profile

```plaintext
PATCH /api/v1/auth/update-profile
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "admin",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

## Project APIs

### 1. Create Project

```plaintext
POST /api/v1/projects
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
title: "Portfolio Website"
description: "My personal portfolio website built with React and Node.js"
technologies: ["React", "Node.js", "Express", "MongoDB"]
liveUrl: "https://myportfolio.com"
githubUrlClient: "https://github.com/username/portfolio"
githubUrlServer: "https://github.com/username/portfolio"
featured: true
order: 1
image: [file upload]
```

**Response:**

```json
{
  "status": "success",
  "message": "Project created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "Portfolio Website",
    "description": "My personal portfolio website built with React and Node.js",
    "technologies": ["React", "Node.js", "Express", "MongoDB"],
    "liveUrl": "https://myportfolio.com",
    "githubUrlClient": "https://github.com/username/portfolio",
    "githubUrlServer": "https://github.com/username/portfolio",
    "featured": true,
    "order": 1,
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/projects/image.jpg",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 2. Get All Projects

```plaintext
GET /api/v1/projects
```

**Query Parameters:**

```plaintext
searchTerm: "react" (optional)
featured: true (optional)
page: 1 (optional, default: 1)
limit: 10 (optional, default: 10)
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c86",
      "title": "Portfolio Website",
      "description": "My personal portfolio website built with React and Node.js",
      "technologies": ["React", "Node.js", "Express", "MongoDB"],
      "liveUrl": "https://myportfolio.com",
      "githubUrlClient": "https://github.com/username/portfolio",
      "githubUrlServer": "https://github.com/username/portfolio",
      "featured": true,
      "order": 1,
      "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/projects/image.jpg",
      "createdAt": "2023-06-22T10:30:40.000Z",
      "updatedAt": "2023-06-22T10:30:40.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 3. Get Single Project

```plaintext
GET /api/v1/projects/:id
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "Portfolio Website",
    "description": "My personal portfolio website built with React and Node.js",
    "technologies": ["React", "Node.js", "Express", "MongoDB"],
    "liveUrl": "https://myportfolio.com",
    "githubUrlClient": "https://github.com/username/portfolio",
    "githubUrlServer": "https://github.com/username/portfolio",
    "featured": true,
    "order": 1,
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/projects/image.jpg",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 4. Update Project

```plaintext
PATCH /api/v1/projects/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
title: "Updated Portfolio Website" (optional)
description: "Updated description" (optional)
technologies: ["React", "Node.js", "Express", "MongoDB", "TypeScript"] (optional)
liveUrl: "https://mynewportfolio.com" (optional)
    "githubUrlClient": "https://github.com/username/portfolio", (optional)
    "githubUrlServer": "https://github.com/username/portfolio", (optional)
featured: false (optional)
order: 2 (optional)
image: [file upload] (optional)
```

**Response:**

```json
{
  "status": "success",
  "message": "Project updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "Updated Portfolio Website",
    "description": "Updated description",
    "technologies": ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
    "liveUrl": "https://mynewportfolio.com",
    "githubUrl": "https://github.com/username/new-portfolio",
    "featured": false,
    "order": 2,
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456999/portfolio/projects/new-image.jpg",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

### 5. Delete Project

```plaintext
DELETE /api/v1/projects/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Project deleted successfully"
}
```

## Blog APIs

### 1. Create Blog

```plaintext
POST /api/v1/blogs
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
title: "Getting Started with React"
content: "Long content with markdown..."
summary: "A beginner's guide to React"
tags: ["React", "JavaScript", "Frontend"]
published: true
image: [file upload]
```

**Response:**

```json
{
  "status": "success",
  "message": "Blog created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Getting Started with React",
    "content": "Long content with markdown...",
    "summary": "A beginner's guide to React",
    "tags": ["React", "JavaScript", "Frontend"],
    "published": true,
    "publishedAt": "2023-06-22T10:30:40.000Z",
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/blogs/image.jpg",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 2. Get All Blogs

```plaintext
GET /api/v1/blogs
```

**Query Parameters:**

```plaintext
searchTerm: "react" (optional)
tags: "React" or tags: ["React", "JavaScript"] (optional)
published: true (optional)
page: 1 (optional, default: 1)
limit: 10 (optional, default: 10)
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c87",
      "title": "Getting Started with React",
      "content": "Long content with markdown...",
      "summary": "A beginner's guide to React",
      "tags": ["React", "JavaScript", "Frontend"],
      "published": true,
      "publishedAt": "2023-06-22T10:30:40.000Z",
      "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/blogs/image.jpg",
      "createdAt": "2023-06-22T10:30:40.000Z",
      "updatedAt": "2023-06-22T10:30:40.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 3. Get Single Blog

```plaintext
GET /api/v1/blogs/:id
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Getting Started with React",
    "content": "Long content with markdown...",
    "summary": "A beginner's guide to React",
    "tags": ["React", "JavaScript", "Frontend"],
    "published": true,
    "publishedAt": "2023-06-22T10:30:40.000Z",
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/blogs/image.jpg",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 4. Update Blog

```plaintext
PATCH /api/v1/blogs/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
title: "Updated React Guide" (optional)
content: "Updated content..." (optional)
summary: "Updated summary" (optional)
tags: ["React", "JavaScript", "Frontend", "Hooks"] (optional)
published: false (optional)
image: [file upload] (optional)
```

**Response:**

```json
{
  "status": "success",
  "message": "Blog updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Updated React Guide",
    "content": "Updated content...",
    "summary": "Updated summary",
    "tags": ["React", "JavaScript", "Frontend", "Hooks"],
    "published": false,
    "publishedAt": "2023-06-22T10:30:40.000Z",
    "image": "https://res.cloudinary.com/your-cloud/image/upload/v1623456999/portfolio/blogs/new-image.jpg",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

### 5. Delete Blog

```plaintext
DELETE /api/v1/blogs/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Blog deleted successfully"
}
```

## Skill APIs

### 1. Create Skill

```plaintext
POST /api/v1/skills
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
name: "React"
category: "Frontend"
proficiency: 5
description: "Building user interfaces with React"
order: 1
logo: [file upload]
```

**Response:**

```json
{
  "status": "success",
  "message": "Skill created successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c88",
    "name": "React",
    "category": "Frontend",
    "proficiency": 5,
    "description": "Building user interfaces with React",
    "order": 1,
    "logo": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/skills/logo.png",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 2. Get All Skills

```plaintext
GET /api/v1/skills
```

**Query Parameters:**

```plaintext
searchTerm: "react" (optional)
category: "Frontend" (optional)
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c88",
      "name": "React",
      "category": "Frontend",
      "proficiency": 5,
      "description": "Building user interfaces with React",
      "order": 1,
      "logo": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/skills/logo.png",
      "createdAt": "2023-06-22T10:30:40.000Z",
      "updatedAt": "2023-06-22T10:30:40.000Z"
    }
  ]
}
```

### 3. Get Skills By Category

```plaintext
GET /api/v1/skills/by-category
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "Frontend": [
      {
        "_id": "60d21b4667d0d8992e610c88",
        "name": "React",
        "category": "Frontend",
        "proficiency": 5,
        "description": "Building user interfaces with React",
        "order": 1,
        "logo": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/skills/logo.png",
        "createdAt": "2023-06-22T10:30:40.000Z",
        "updatedAt": "2023-06-22T10:30:40.000Z"
      }
    ],
    "Backend": [
      {
        "_id": "60d21b4667d0d8992e610c89",
        "name": "Node.js",
        "category": "Backend",
        "proficiency": 4,
        "description": "Server-side JavaScript",
        "order": 1,
        "logo": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/skills/nodejs-logo.png",
        "createdAt": "2023-06-22T10:30:40.000Z",
        "updatedAt": "2023-06-22T10:30:40.000Z"
      }
    ]
  }
}
```

### 4. Get Single Skill

```plaintext
GET /api/v1/skills/:id
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c88",
    "name": "React",
    "category": "Frontend",
    "proficiency": 5,
    "description": "Building user interfaces with React",
    "order": 1,
    "logo": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/skills/logo.png",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 5. Update Skill

```plaintext
PATCH /api/v1/skills/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
name: "React.js" (optional)
category: "Frontend" (optional)
proficiency: 5 (optional)
description: "Updated description" (optional)
order: 2 (optional)
logo: [file upload] (optional)
```

**Response:**

```json
{
  "status": "success",
  "message": "Skill updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c88",
    "name": "React.js",
    "category": "Frontend",
    "proficiency": 5,
    "description": "Updated description",
    "order": 2,
    "logo": "https://res.cloudinary.com/your-cloud/image/upload/v1623456999/portfolio/skills/new-logo.png",
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

### 6. Delete Skill

```plaintext
DELETE /api/v1/skills/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Skill deleted successfully"
}
```

## Feedback APIs

### 1. Create Feedback (Public)

```plaintext
POST /api/v1/feedback
```

**Request Body:**

```json
{
  "name": "Jane Smith",
  "company": "Tech Corp",
  "position": "CTO",
  "message": "John is an excellent developer who delivered our project on time and with high quality.",
  "rating": 5
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c8a",
    "name": "Jane Smith",
    "company": "Tech Corp",
    "position": "CTO",
    "message": "John is an excellent developer who delivered our project on time and with high quality.",
    "rating": 5,
    "isVisible": false,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 2. Get All Feedback

```plaintext
GET /api/v1/feedback
```

**Query Parameters:**

```plaintext
isVisible: true (optional)
page: 1 (optional, default: 1)
limit: 10 (optional, default: 10)
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c8a",
      "name": "Jane Smith",
      "company": "Tech Corp",
      "position": "CTO",
      "message": "John is an excellent developer who delivered our project on time and with high quality.",
      "rating": 5,
      "isVisible": true,
      "createdAt": "2023-06-22T10:30:40.000Z",
      "updatedAt": "2023-06-22T10:30:40.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 3. Get Single Feedback

```plaintext
GET /api/v1/feedback/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c8a",
    "name": "Jane Smith",
    "company": "Tech Corp",
    "position": "CTO",
    "message": "John is an excellent developer who delivered our project on time and with high quality.",
    "rating": 5,
    "isVisible": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 4. Update Feedback

```plaintext
PATCH /api/v1/feedback/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "isVisible": true
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c8a",
    "name": "Jane Smith",
    "company": "Tech Corp",
    "position": "CTO",
    "message": "John is an excellent developer who delivered our project on time and with high quality.",
    "rating": 5,
    "isVisible": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

### 5. Delete Feedback

```plaintext
DELETE /api/v1/feedback/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Feedback deleted successfully"
}
```

## Resume APIs

### 1. Create Resume

```plaintext
POST /api/v1/resume
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
title: "Software Engineer Resume 2023"
isActive: true
file: [file upload]
```

**Response:**

```json
{
  "status": "success",
  "message": "Resume uploaded successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c8b",
    "title": "Software Engineer Resume 2023",
    "file": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/resume/resume.pdf",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 2. Get All Resumes

```plaintext
GET /api/v1/resume
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c8b",
      "title": "Software Engineer Resume 2023",
      "file": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/resume/resume.pdf",
      "isActive": true,
      "createdAt": "2023-06-22T10:30:40.000Z",
      "updatedAt": "2023-06-22T10:30:40.000Z"
    }
  ]
}
```

### 3. Get Active Resume (Public)

```plaintext
GET /api/v1/resume/active
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c8b",
    "title": "Software Engineer Resume 2023",
    "file": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/resume/resume.pdf",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 4. Get Single Resume

```plaintext
GET /api/v1/resume/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4667d0d8992e610c8b",
    "title": "Software Engineer Resume 2023",
    "file": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/resume/resume.pdf",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T10:30:40.000Z"
  }
}
```

### 5. Update Resume

```plaintext
PATCH /api/v1/resume/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

```plaintext
title: "Updated Resume Title" (optional)
isActive: false (optional)
file: [file upload] (optional)
```

**Response:**

```json
{
  "status": "success",
  "message": "Resume updated successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c8b",
    "title": "Updated Resume Title",
    "file": "https://res.cloudinary.com/your-cloud/image/upload/v1623456999/portfolio/resume/new-resume.pdf",
    "isActive": false,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

### 6. Delete Resume

```plaintext
DELETE /api/v1/resume/:id
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Resume deleted successfully"
}
```

### 7. Set Resume as Active

```plaintext
PATCH /api/v1/resume/:id/set-active
```

**Headers:**

```plaintext
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "status": "success",
  "message": "Resume set as active successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c8b",
    "title": "Software Engineer Resume 2023",
    "file": "https://res.cloudinary.com/your-cloud/image/upload/v1623456789/portfolio/resume/resume.pdf",
    "isActive": true,
    "createdAt": "2023-06-22T10:30:40.000Z",
    "updatedAt": "2023-06-22T11:45:22.000Z"
  }
}
```

## Error Responses

All APIs follow a consistent error response format:

### Validation Error

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation Error",
  "errors": [
    {
      "path": "name",
      "message": "Name is required"
    }
  ]
}
```

### Not Found Error

```json
{
  "status": "error",
  "message": "Resource not found"
}
```

### Authentication Error

```json
{
  "status": "error",
  "message": "You are not logged in! Please log in to get access."
}
```

### Server Error

```json
{
  "status": "error",
  "message": "Something went wrong!"
}
```

## Frontend Integration Examples

### Example: Fetching Projects

```javascript
// React example with fetch API
import { useState, useEffect } from "react";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://your-api.vercel.app/api/v1/projects?featured=true"
        );
        const result = await response.json();

        if (result.status === "success") {
          setProjects(result.data);
        } else {
          setError(result.message || "Failed to fetch projects");
        }
      } catch (err) {
        setError("Error fetching projects: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div key={project._id} className="project-card">
          <img src={project.image || "/placeholder.svg"} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="technologies">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
          <div className="project-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
            )}
            {project.githubUrlClient && (
              <a
                href={project.githubUrlClient}
                target="_blank"
                rel="noopener noreferrer"
              >
                Client
              </a>
            )}
            {project.githubUrlServer && (
              <a
                href={project.githubUrlServer}
                target="_blank"
                rel="noopener noreferrer"
              >
                Server
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
```

### Example: Creating a New Blog Post

```javascript
// React example with form submission
import { useState } from "react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    tags: [],
    published: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get token from localStorage or context
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("summary", formData.summary);
      formData.tags.forEach((tag) => data.append("tags", tag));
      data.append("published", formData.published);
      if (image) data.append("image", image);

      const response = await fetch("https://your-api.vercel.app/api/v1/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (result.status === "success") {
        setSuccess(true);
        // Reset form
        setFormData({
          title: "",
          content: "",
          summary: "",
          tags: [],
          published: false,
        });
        setImage(null);
      } else {
        setError(result.message || "Failed to create blog post");
      }
    } catch (err) {
      setError("Error creating blog post: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-form">
      <h2>Create New Blog Post</h2>

      {success && (
        <div className="success-message">Blog post created successfully!</div>
      )}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Featured Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, published: e.target.checked }))
            }
          />
          <label htmlFor="published">Publish immediately</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Blog Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
```

This comprehensive API documentation covers all the endpoints in your portfolio backend project, including the request and response formats for each. You can use these examples as a reference when building your frontend application to interact with your backend API.
