import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .exists()
    .withMessage("Phone Number is Required")
    .isMobilePhone("en-IN")
    .withMessage("Invalid Phone Number"),

  body("password")
    .exists()
    .withMessage("Password is Required")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must contains atleast 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    // passes control to the next handler (e.g., our controller).
    next();
  },
];

// raw and old way of writing validator
// Plain validation, by hand
/**
export const registerValidator = (req, res, next) => {
    const { email, phone, password } = req.body;

  const errors = [];

  // checking exists or not
  if (!email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email && !emailRegex.test(email)) {
    errors.push({
      field: "email",
      message: "Invalid Email Address",
    });
  }

  if (!phone) {
    errors.push({
      field: "phone",
      message: "Phone number is required",
    });
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (phone && !phoneRegex.test(phone)) {
    errors.push({
      field: "phone",
      message: "Invalid Phone Number",
    });
  }

  if (!password && !password.trim()) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
}

if (password.trim().length < 6) {
    errors.push({
        field: "password",
        message: "Password must contain minimum 6 characters",
    });
}

if (errors.length > 0) {
    res.status(400).json({
        message: "Invalid request",
        errors,
    });
}

next();
};
*/
