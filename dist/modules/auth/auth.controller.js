"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getMe = exports.logout = exports.login = exports.register = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const catchAsync_1 = require("../../utils/catchAsync");
// Register a new user
exports.register = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const userData = req.body;
    const user = await (0, auth_service_1.registerUser)(userData);
    res.status(http_status_1.default.CREATED).json({
        status: "success",
        message: "User registered successfully",
        data: user,
    });
});
// Login user
exports.login = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { email, password } = req.body;
    const result = await (0, auth_service_1.loginUser)({ email, password });
    // Set cookie
    const cookieOptions = {
        expires: new Date(Date.now() +
            Number.parseInt(process.env.JWT_COOKIE_EXPIRES_IN || "30") *
                24 *
                60 *
                60 *
                1000),
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };
    res.cookie("token", result.token, cookieOptions);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Logged in successfully",
        data: result,
    });
});
// Logout user
const logout = (_req, res) => {
    res.cookie("token", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Logged out successfully",
    });
};
exports.logout = logout;
// Get current user
exports.getMe = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = await (0, auth_service_1.getCurrentUser)(req.user._id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        data: user,
    });
});
// Update profile
exports.updateUserProfile = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const updatedUser = await (0, auth_service_1.updateProfile)(req.user._id, req.body);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Profile updated successfully",
        data: updatedUser,
    });
});
