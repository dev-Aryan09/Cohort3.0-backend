import express from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = express.Router();

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = { email,name,password }
 * @response res.status = 201 (if successful)
 */
router.post("/register", registerValidator, registerController);

export default router;
