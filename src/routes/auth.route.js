import express from 'express'
import { signupController, loginController, verifyOtpController } from '../controllers/auth.controller.js'
const router = express.Router()

router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/verify-otp", verifyOtpController)
export default router