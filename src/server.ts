import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import httpStatus from "http-status";
import mongoose from "mongoose";

// Import routes
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { blogRoutes } from "./modules/blog/blog.routes";
import { ExperienceRoutes } from "./modules/experience/experience.route";
import { feedbackRoutes } from "./modules/feedback/feedback.routes";
import { projectRoutes } from "./modules/project/project.routes";
import { skillRoutes } from "./modules/skill/skill.routes";

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();

// Apply middlewares
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Server is running",
  });
});

// Apply routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/experiences", ExperienceRoutes);

// Handle undefined routes
app.all("*", (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: "error",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

export default app;
