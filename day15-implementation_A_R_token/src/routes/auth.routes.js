import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import config from "../config/config.js";

const router = Router();

/**
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check for missing credentials
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing name or email or password",
      });
    }

    // check for user already exist or not (unique email)
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exists",
        errors: [
          {
            path: "email",
            message: "User already exists",
          },
        ],
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: passwordHash,
    });

    // access token
    const accessToken = jwt.sign({ id: user._id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "3m",
    });

    // refresh token and save this in cookies
    const refreshToken = jwt.sign(
      { id: user._id },
      config.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );
    // storing in cookies
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res.status(201).json({
      message: "user created successfully!",
      data: user,
      accessToken: accessToken,
      // refreshToken: refreshToken, // store in cookies
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Internal Server Error",
        error,
      },
    });
  }
});

export default router;
