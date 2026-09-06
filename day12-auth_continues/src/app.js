import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

  // password hashing
  const hash = await bcrypt.hash(password, 10);

  // save to DB
  const newUser = await UserModel.create({ name, email, password: hash });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  return res.status(201).json({
    message: "user registered successfully",
    data: {
      user: {
        name,
        email,
        password: hash,
      },
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

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }); // finding user based on user's input

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "user loggedIn successfully",
      data: {
        user: {
          email: user.email,
          password: user.password,
        },
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in loggin in",
      error: error,
    });
  }
});

export default app;
