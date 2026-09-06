import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // const token = jwt.decode(authHeader); // reads encoded data from token

  /**
   * reads encoded data & cross verifies the token from provided secret key
   * to check that whether the token belongs to our server or not
   */
  const token = jwt.verify(authHeader, process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  const user = await UserModel.findById(token.id);

  req.user = user;

  next();
};
