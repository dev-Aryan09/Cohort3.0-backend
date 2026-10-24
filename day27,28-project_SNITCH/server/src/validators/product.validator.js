import { body, validationResult, param } from "express-validator";

export const createProductValidator = [
  // req.body.title
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a String")
    .bail()
    .trim()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Title only contains small and capital case alphabets")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title length must be between 3 and 50 characters"),

  // req.body.description
  body("description")
    .exists()
    .withMessage("Description id required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description length must be between 10 and 500 characters"),

  //req.body.price.amount
  body("price.amount")
    .exists()
    .withMessage("Amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Price amount must be a floating number and must be greater than 0",
    ),

  //req.body.price.currency
  body("price.currency")
    .exists()
    .withMessage("Currency is required")
    .bail()
    .isString()
    .withMessage("Currency must be a string value")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("Currency must be either INR or USD"),

  body("sizes")
    .exists()
    .withMessage("Sizes are required")
    .bail()
    .isArray()
    .withMessage("Sizes must be an array of objects"),

  body("sizes.*.size")
    .exists()
    .withMessage("Size must be present in every entry of sizes array")
    .bail()
    .isString()
    .withMessage("Size must be a string value")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size can be one of these XS, S, M, L, XL, XXL."),

  body("sizes.*.stock")
    .exists()
    .withMessage("Stock must be present in every entry of sizes array")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock muct be an integer valuse"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];

export const unlistProductValidator = [
  //req.params.id
  param("id")
    .exists()
    .withMessage("Product ID must present in the params")
    .bail()
    .isMongoId()
    .withMessage("Product ID must be a valid mongo object ID"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];

export const listProductValidator = [
  //req.params.id
  param("id")
    .exists()
    .withMessage("Product ID must present in the params")
    .bail()
    .isMongoId()
    .withMessage("Product ID must be a valid mongo object ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];
