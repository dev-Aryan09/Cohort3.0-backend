import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";

/**
 * @description Register an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.name String
 * @param req.body.password String
 */
export const registerController = async (req, res) => {
  console.log("01");
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this email address already exists",
      errors: [
        {
          field: "email",
          message: "User with this email address already exists",
        },
      ],
    });
  }

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      name,
      passwordHash: hash,
    });

    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    await userModel.findByIdAndUpdate(user._id, { refreshToken });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error while registering a user",
      error,
    });
  }
};
