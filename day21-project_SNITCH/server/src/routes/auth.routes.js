import express from "express";
import {
  loginController,
  refreshTokensController,
  registerController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = { email,name,password }
 * @response res.status = 201 (if successful)
 */
router.post("/register", registerValidator, registerController);

/**
 * @POST /api/auth/register
 * @param req.body = {email,password}
 * @response res.status = 200 (if successful)
 */
router.post("/login", loginValidator, loginController);

/**
 * @POST /api/auth/refresh
 */
router.post("/refresh", refreshTokensController);

export default router;
