import express from "express";
import multer from "multer";
import { createProductValidator } from "../validators/product.validator.js";
import {
  createProductController,
  listAllProducts,
} from "../controllers/products.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5, // upto 5 images
    fileSize: 3 * 1024 * 1024, // 1 MB
  },
});

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * @access seller
 * @param req.body=>{title,,description, price:{amount,currency} ,sizes:[{size,stock},{size,stock}]}
 */
router.post(
  "/",
  // ---------- check is user authenticate ----------
  authenticate,

  // ---------- check the role is seller or not ----------
  (req, res, next) => {
    const { role } = req.user;

    if (role !== "seller") {
      return res.status(403).json({
        field: "role",
        message: "User is unauthorized to create a product",
      });
    }
    next();
  },

  // ---------- required for reading the data from req.body if the format is form-data(multipart/form-data) ----------
  upload.array("images"),

  // ---------- parse the complex data like object or array into JSON ----------
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));

    next();
  },

  // ---------- validation logic ----------
  createProductValidator,

  // ---------- main business logic ----------
  createProductController,
);

/**
 * @method GET
 * @route /api/products/
 * @description get all the products from DB
 * @access user
 */
router.get("/", authenticate, listAllProducts);

export default router;
