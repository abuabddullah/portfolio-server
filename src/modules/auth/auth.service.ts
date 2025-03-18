import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import { AppError } from "../../middlewares/globalErrorHandler";
import { User } from "./auth.model";
import type { ILoginResponse, ILoginUser, IUser } from "./auth.type";

// Generate JWT token
const JWT_SECRET: Secret | undefined =
  process.env.JWT_SECRET ||
  "641df895d323b08b545344483c3c6164b799f8de87a2c04e73453b548c00374c";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}
export type TJWTPayload = {
  _id: string;
  email: string;
  role: "admin";
};
export const generateToken = (jwtPayload: TJWTPayload): string => {
  return jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions); // Explicitly casting to SignOptions
};

// Register a new user
export const registerUser = async (userData: IUser): Promise<IUser> => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError("Email already in use", httpStatus.BAD_REQUEST);
  }

  // Check if there's already an admin user
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    throw new AppError(
      "Admin user already exists. Only one admin is allowed.",
      httpStatus.BAD_REQUEST
    );
  }

  // Create new user
  const newUser = await User.create(userData);
  return newUser;
};

// Login user
export const loginUser = async (
  loginData: ILoginUser
): Promise<ILoginResponse> => {
  const { email, password } = loginData;

  // Find user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", httpStatus.UNAUTHORIZED);
  }

  // Check if password is correct
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", httpStatus.UNAUTHORIZED);
  }

  // Generate JWT token
  const jwtPayload = {
    _id: user._id as string,
    email: user.email as string,
    role: user.role,
  };
  const token = generateToken(jwtPayload);

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

// Get current user
export const getCurrentUser = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }
  return user;
};

// Update user profile
export const updateProfile = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser> => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError("User not found", httpStatus.NOT_FOUND);
  }

  return user;
};
