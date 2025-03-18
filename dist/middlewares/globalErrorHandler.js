"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.AppError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const handleZodError = (error) => {
    const errors = error.errors.map((err) => {
        return {
            path: err.path.join("."),
            message: err.message,
        };
    });
    return {
        status: "error",
        statusCode: http_status_1.default.BAD_REQUEST,
        message: "Validation Error",
        errors,
    };
};
const handleCastError = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return {
        status: "error",
        statusCode: http_status_1.default.BAD_REQUEST,
        message,
    };
};
const handleDuplicateKeyError = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return {
        status: "error",
        statusCode: http_status_1.default.BAD_REQUEST,
        message,
    };
};
const handleJWTError = () => {
    return {
        status: "error",
        statusCode: http_status_1.default.UNAUTHORIZED,
        message: "Invalid token. Please log in again!",
    };
};
const handleJWTExpiredError = () => {
    return {
        status: "error",
        statusCode: http_status_1.default.UNAUTHORIZED,
        message: "Your token has expired! Please log in again.",
    };
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        // Programming or other unknown error: don't leak error details
        console.error("ERROR 💥", err);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};
const globalErrorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        error.message = err.message;
        if (err instanceof zod_1.ZodError) {
            const formattedError = handleZodError(err);
            return res.status(formattedError.statusCode).json(formattedError);
        }
        if (err.name === "CastError")
            error = handleCastError(error);
        if (err.code === 11000)
            error = handleDuplicateKeyError(error);
        if (err.name === "JsonWebTokenError")
            error = handleJWTError();
        if (err.name === "TokenExpiredError")
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
