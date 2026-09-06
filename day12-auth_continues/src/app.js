import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import UserModel from "./models/user.model.js";
import { authenticate } from "./middlewares/auth.middleware.js";
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  return res.status(200).json({
    message: "welcome to the authentication API",
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  // save to DB
  const newUser = await UserModel.create({ name, email, password });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  return res.status(201).json({
    message: "user registered successfully",
    data: {
      user: newUser,
    },
    token: token,
  });
});

app.get("/api/auth/me", authenticate, async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    message: "user logged in successfully",
    data: {
      user: user,
    },
  });
});

export default app;
