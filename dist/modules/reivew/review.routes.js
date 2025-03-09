"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const isAdmin_1 = require("../../middlewares/isAdmin");
const validateRequest_1 = require("../../middlewares/validateRequest");
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
// Public routes
router.get("/approved", review_controller_1.reviewController.getApprovedReviews);
// User routes (requires authentication)
router.post("/", (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(review_validation_1.createReviewSchema), review_controller_1.reviewController.createReview);
router.get("/my-reviews", (0, auth_1.auth)(), review_controller_1.reviewController.getUserReviews);
router.patch("/:id", (0, auth_1.auth)(), (0, validateRequest_1.validateRequest)(review_validation_1.updateReviewSchema), review_controller_1.reviewController.updateReview);
router.delete("/:id", (0, auth_1.auth)(), review_controller_1.reviewController.deleteReview);
// Admin routes
router.get("/", (0, auth_1.auth)(), isAdmin_1.isAdmin, review_controller_1.reviewController.getAllReviews);
router.get("/:id", (0, auth_1.auth)(), review_controller_1.reviewController.getReviewById);
router.patch("/:id/status", (0, auth_1.auth)(), isAdmin_1.isAdmin, (0, validateRequest_1.validateRequest)(review_validation_1.updateReviewStatusSchema), review_controller_1.reviewController.updateReviewStatus);
exports.reviewRoutes = router;
