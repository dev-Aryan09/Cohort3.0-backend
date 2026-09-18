import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

export const registerController = async (req, res) => {
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

    const { accessToken, refreshToken } = generateTokens({ userdId: user._id });

    // updating existing document in DB using save()
    ((user.refreshToken = refreshToken), await user.save());

    // storing in cookies
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    return res.status(201).json({
      message: "user created successfully!",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
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
};
