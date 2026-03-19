import express from "express";
import { loginRequest, verifyCode } from "../controllers/authController.js";

const router = express.Router();

router.post("/login-request", loginRequest);
router.post("/verify-code", verifyCode);

export default router;