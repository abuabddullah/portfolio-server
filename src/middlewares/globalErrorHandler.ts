import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleZodError = (error: ZodError) => {
  const errors = error.errors.map((err) => {
    return {
      path: err.path.join("."),
      message: err.message,
    };
  });

  return {
    status: "error",
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errors,
  };
};

const handleCastError = (error: any) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return {
    status: "error",
    statusCode: httpStatus.BAD_REQUEST,
    message,
  };
};

const handleDuplicateKeyError = (error: any) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return {
    status: "error",
    statusCode: httpStatus.BAD_REQUEST,
    message,
  };
};

const handleJWTError = () => {
  return {
    status: "error",
    statusCode: httpStatus.UNAUTHORIZED,
    message: "Invalid token. Please log in again!",
  };
};

const handleJWTExpiredError = () => {
  return {
    status: "error",
    statusCode: httpStatus.UNAUTHORIZED,
    message: "Your token has expired! Please log in again.",
  };
};

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err instanceof ZodError) {
      const formattedError = handleZodError(err);
      return res.status(formattedError.statusCode).json(formattedError);
    }

    if (err.name === "CastError") error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateKeyError(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
