"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = exports.uploadBlogImage = exports.uploadSkillLogo = exports.uploadProjectImage = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const globalErrorHandler_1 = require("./globalErrorHandler");
const http_status_1 = __importDefault(require("http-status"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Create storage engine for different file types
const createStorage = (folder) => {
    return new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_1.v2,
        params: {
            folder: `portfolio/${folder}`,
            allowed_formats: ["jpg", "jpeg", "png", "gif", "pdf", "svg"],
            transformation: [{ width: 1000, height: 1000, crop: "limit" }],
        },
    });
};
// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
        cb(null, true);
    }
    else {
        cb(new globalErrorHandler_1.AppError("Not a valid file type! Please upload only images or PDFs.", http_status_1.default.BAD_REQUEST), false);
    }
};
// Create upload middleware for different resources
const uploadImage = (folder) => {
    return (0, multer_1.default)({
        storage: createStorage(folder),
        fileFilter: fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    });
};
exports.uploadImage = uploadImage;
// Specific upload middlewares
exports.uploadProjectImage = (0, exports.uploadImage)("projects").single("image");
exports.uploadSkillLogo = (0, exports.uploadImage)("skills").single("logo");
exports.uploadBlogImage = (0, exports.uploadImage)("blogs").single("image");
exports.uploadResume = (0, exports.uploadImage)("resume").single("file");
