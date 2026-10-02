import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email || !phone || !password) {
    return res.status(400).json({
      message: "Invalid or missing credentials",
    });
  }
  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      phone,
      passwordHash: hash,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
});

export default router;
