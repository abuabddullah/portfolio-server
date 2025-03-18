"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = require("./globalErrorHandler");
const auth_model_1 = require("../modules/auth/auth.model");
const protect = async (req, _res, next) => {
    var _a;
    try {
        // 1) Get token from authorization header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return next(new globalErrorHandler_1.AppError("You are not logged in! Please log in to get access.", http_status_1.default.UNAUTHORIZED));
        }
        // 2) Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // 3) Check if user still exists
        const currentUser = await auth_model_1.User.findById(decoded.id);
        if (!currentUser) {
            return next(new globalErrorHandler_1.AppError("The user belonging to this token no longer exists.", http_status_1.default.UNAUTHORIZED));
        }
        // 4) Grant access to protected route
        req.user = currentUser;
        next();
    }
    catch (error) {
        next(new globalErrorHandler_1.AppError("Authentication failed", http_status_1.default.UNAUTHORIZED));
    }
};
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, _res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new globalErrorHandler_1.AppError("You do not have permission to perform this action", http_status_1.default.FORBIDDEN));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
