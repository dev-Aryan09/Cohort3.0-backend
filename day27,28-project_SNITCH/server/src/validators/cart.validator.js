import { body, validationResult } from "express-validator";

export const addToCartValidator = [
  body("productId")
    .exists()
    .withMessage("Product Id must be required")
    .bail()
    .isString()
    .withMessage("Product Id must be a string value")
    .bail()
    .trim()
    .isMongoId()
    .withMessage("Product Id must be a mongo Id"),

  body("quantity")
    .exists()
    .withMessage("Quantity must be required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Quantity must be an interger value and greater than 0"),

  body("size")
    .exists()
    .withMessage("Size must be required")
    .bail()
    .isString()
    .withMessage("Size must be a sting value")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size must be within XS, S, M, L, XL, XXL"),

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
