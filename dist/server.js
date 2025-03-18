"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
// Import routes
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const auth_routes_1 = require("./modules/auth/auth.routes");
const blog_routes_1 = require("./modules/blog/blog.routes");
const experience_route_1 = require("./modules/experience/experience.route");
const feedback_routes_1 = require("./modules/feedback/feedback.routes");
const project_routes_1 = require("./modules/project/project.routes");
const skill_routes_1 = require("./modules/skill/skill.routes");
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
// Apply middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Apply rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// Health check route
app.get("/health", (_req, res) => {
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Server is running",
    });
});
// Apply routes
app.use("/api/v1/auth", auth_routes_1.authRoutes);
app.use("/api/v1/projects", project_routes_1.projectRoutes);
app.use("/api/v1/skills", skill_routes_1.skillRoutes);
app.use("/api/v1/blogs", blog_routes_1.blogRoutes);
app.use("/api/v1/feedback", feedback_routes_1.feedbackRoutes);
app.use("/api/v1/experiences", experience_route_1.ExperienceRoutes);
// Handle undefined routes
app.all("*", (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: "error",
        message: `Cannot find ${req.originalUrl} on this server!`,
    });
});
// Global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// Start server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
mongoose_1.default
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
exports.default = app;
