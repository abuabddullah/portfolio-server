import type { Request } from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { AppError } from "./globalErrorHandler"
import httpStatus from "http-status"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Create storage engine for different file types
const createStorage = (folder: string) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `portfolio/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "svg"],
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    } as any,
  })
}

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
    cb(null, true)
  } else {
    cb(new AppError("Not a valid file type! Please upload only images or PDFs.", httpStatus.BAD_REQUEST), false)
  }
}

// Create upload middleware for different resources
export const uploadImage = (folder: string) => {
  return multer({
    storage: createStorage(folder),
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  })
}

// Specific upload middlewares
export const uploadProjectImage = uploadImage("projects").single("image")
export const uploadSkillLogo = uploadImage("skills").single("logo")
export const uploadBlogImage = uploadImage("blogs").single("image")
export const uploadResume = uploadImage("resume").single("file")

