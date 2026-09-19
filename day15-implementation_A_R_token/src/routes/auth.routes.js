import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";
import { generateTokens } from "../utils/auth.js";
import {
  refreshTokensController,
  getMeController,
  registerController,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * @POST /api/auth/register
 */
router.post("/register", registerController);

/**
 * @GET /api/auth/me
 */
router.get("/me", getMeController);

/**
 * @POST /api/auth/refresh
 */
router.post("/refresh", refreshTokensController);

export default router;
