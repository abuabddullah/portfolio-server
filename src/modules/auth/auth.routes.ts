import express from "express"
import { register, login, logout, getMe, updateUserProfile } from "./auth.controller"
import { protect } from "../../middlewares/auth.middleware"
import { validateRequest } from "../../middlewares/validateRequest"
import { loginZodSchema, registerZodSchema, updateProfileZodSchema } from "./auth.zod"

const router = express.Router()

// Public routes
router.post("/register", validateRequest(registerZodSchema), register)
router.post("/login", validateRequest(loginZodSchema), login)
router.get("/logout", logout)

// Protected routes
router.use(protect)
router.get("/me", getMe)
router.patch("/update-profile", validateRequest(updateProfileZodSchema), updateUserProfile)

export const authRoutes = router

