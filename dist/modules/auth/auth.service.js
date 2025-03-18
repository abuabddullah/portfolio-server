"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getCurrentUser = exports.loginUser = exports.registerUser = exports.generateToken = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globalErrorHandler_1 = require("../../middlewares/globalErrorHandler");
const auth_model_1 = require("./auth.model");
// Generate JWT token
const JWT_SECRET = process.env.JWT_SECRET ||
    "641df895d323b08b545344483c3c6164b799f8de87a2c04e73453b548c00374c";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}
const generateToken = (jwtPayload) => {
    return jsonwebtoken_1.default.sign(jwtPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    }); // Explicitly casting to SignOptions
};
exports.generateToken = generateToken;
// Register a new user
const registerUser = async (userData) => {
    // Check if user already exists
    const existingUser = await auth_model_1.User.findOne({ email: userData.email });
    if (existingUser) {
        throw new globalErrorHandler_1.AppError("Email already in use", http_status_1.default.BAD_REQUEST);
    }
    // Check if there's already an admin user
    const adminExists = await auth_model_1.User.findOne({ role: "admin" });
    if (adminExists) {
        throw new globalErrorHandler_1.AppError("Admin user already exists. Only one admin is allowed.", http_status_1.default.BAD_REQUEST);
    }
    // Create new user
    const newUser = await auth_model_1.User.create(userData);
    return newUser;
};
exports.registerUser = registerUser;
// Login user
const loginUser = async (loginData) => {
    const { email, password } = loginData;
    // Find user by email
    const user = await auth_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new globalErrorHandler_1.AppError("Invalid email or password", http_status_1.default.UNAUTHORIZED);
    }
    // Check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new globalErrorHandler_1.AppError("Invalid email or password", http_status_1.default.UNAUTHORIZED);
    }
    // Generate JWT token
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const token = (0, exports.generateToken)(jwtPayload);
    return {
        token,
        user: {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};
exports.loginUser = loginUser;
// Get current user
const getCurrentUser = async (userId) => {
    const user = await auth_model_1.User.findById(userId);
    if (!user) {
        throw new globalErrorHandler_1.AppError("User not found", http_status_1.default.NOT_FOUND);
    }
    return user;
};
exports.getCurrentUser = getCurrentUser;
// Update user profile
const updateProfile = async (userId, updateData) => {
    const user = await auth_model_1.User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new globalErrorHandler_1.AppError("User not found", http_status_1.default.NOT_FOUND);
    }
    return user;
};
exports.updateProfile = updateProfile;
