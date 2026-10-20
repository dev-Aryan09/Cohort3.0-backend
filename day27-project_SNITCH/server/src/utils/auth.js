import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateAccessToken = ({ userId, role }) => {
  try {
    const token = jwt.sign({ userId, role }, config.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    return token;
  } catch (error) {
    console.log("Error in creating access token:", error);
  }
};
export const generateRefreshToken = ({ userId, role }) => {
  try {
    const token = jwt.sign({ userId, role }, config.REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Error in creating refresh token:", error);
  }
};

export const readAccessToken = (token) => {
  const decoded = jwt.verify(token, config.ACCESS_SECRET_KEY);
  return decoded;
};

export const readRefreshToken = (token) => {
  const decoded = jwt.verify(token, config.REFRESH_SECRET_KEY);
  return decoded;
};
