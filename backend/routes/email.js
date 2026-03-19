import express from "express";
import { contactOwner } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", contactOwner);

export default router;