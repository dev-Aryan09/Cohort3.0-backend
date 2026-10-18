import { readAccessToken } from "../utils/auth.js";

export const authenticate = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({
      message: "Access token not found in the request header",
    });
  }

  try {
    const decoded = readAccessToken(accessToken);

    // {userId ,role}
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};
