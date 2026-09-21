import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

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

    const { accessToken, refreshToken } = generateTokens({ userId: user._id });

    // updating existing document in DB using save()
    user.refreshToken = refreshToken;
    await user.save();

    // setting in cookies
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
        message: "Internal Server Error during register",
        error,
      },
    });
  }
};

export const getMeController = async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  // checking token
  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
      rejectedToekn: accessToken,
    });
  }
  try {
    // reading token
    const decoded = verifyAccessToken(accessToken);

    const user = await userModel.findById(decoded.id);

    return res.status(200).json({
      message: "User fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, invalid or expired access token",
    });
  }
};

export const refreshTokensController = async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log("RF", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, missing refresh token",
    });
  }

  try {
    console.log("inside try");
    const decoded = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      // In case, someone trying to get in with tempered token
      user.refreshToken = null;
      await user.save();

      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });

    // updating refresh token in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    return res.status(201).json({
      message: "Tokens refreshed successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, invalid or expired token",
      error: error,
    });
  }
};
