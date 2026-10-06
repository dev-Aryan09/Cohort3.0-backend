import { body, validationResult } from "express-validator";

/**
 * @description Performs validation and stops invalid data entering to our business logic (controller)
 */
export const registerValidator = [
  body("email") // req.body.email
    .exists()
    .withMessage("Email is required")
    .bail() // Stops running validations if any of the previous ones have failed.
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("name") // req.body.name
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must have characters between 3 to 50"),

  body("password") // req.body.password
    .exists()
    .withMessage("Password is requires")
    .bail()
    .isString()
    .withMessage("Password must be srting")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must have atleast 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        error: errors.array(),
      });
    }
    next();
  },
];

/**
 * @description
 */
export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be string")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must contains atleast 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];
