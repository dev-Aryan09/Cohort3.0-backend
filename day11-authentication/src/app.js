const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  return res.status(200).json({
    message: "welcome to authentication API",
  });
});

app.post("/api/auth/register", (req, res) => {
  const { email, username, password } = req.body;

  /**
   * Save to DB logic
   */

  const token = jwt.sign(
    { email, username },
    "EIFq3n1yerGOcocOiKXOGGyIAqekduG9JaSv4zmxZ5X",
  );

  return res.status(201).json({
    message: "user created successfully",
    data: {
      user: { username, email },
    },
    token: token,
  });
});

module.exports = app;
