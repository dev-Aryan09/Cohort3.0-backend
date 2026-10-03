import express from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @POST /api/auth/register
 */
router.post("/register", registerValidator, registerController);

export default router;
