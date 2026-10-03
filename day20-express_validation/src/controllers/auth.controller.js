import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

/**
 * req.body = {email, phone, password}
 */
export const registerController = async (req, res) => {
  const { email, phone, password } = req.body;
  /**
    * This will NOT give error for a particular field,
      make difficult to analyse the exact problem
    
   if (!email || !phone || !password) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: [
          {
            field: "email",
            message: "Email is required",
          },
        ],
      });
    }
   */

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
};
