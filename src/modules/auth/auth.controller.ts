import type { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
} from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

// Register a new user
export const register = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const userData = req.body;
    const user = await registerUser(userData);

    res.status(httpStatus.CREATED).json({
      status: "success",
      message: "User registered successfully",
      data: user,
    });
  }
);

// Login user
export const login = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    // Set cookie
    const cookieOptions = {
      expires: new Date(
        Date.now() +
          Number.parseInt(process.env.JWT_COOKIE_EXPIRES_IN || "30") *
            24 *
            60 *
            60 *
            1000
      ),
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", result.token, cookieOptions);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Logged in successfully",
      data: result,
    });
  }
);

// Logout user
export const logout = (_req: Request, res: Response) => {
  res.cookie("token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Logged out successfully",
  });
};

// Get current user
export const getMe = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const user = await getCurrentUser(req.user._id);

    res.status(httpStatus.OK).json({
      status: "success",
      data: user,
    });
  }
);

// Update profile
export const updateUserProfile = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const updatedUser = await updateProfile(req.user._id, req.body);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUser,
    });
  }
);
