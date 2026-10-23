import express from "express";
import {
  addToCartController,
  getAllCartProductsController,
} from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addToCartValidator } from "../validators/cart.validator.js";

const router = express.Router();

/**
 * @method POST
 * @route /api/cart/
 * @access protected
 * @description Add an product to the user's cart
 * @param req.body => req.body = { productId,quantity,size}
 */
router.post("/", authenticate, addToCartValidator, addToCartController);

/**
 * @method GET
 * @route /api/cart/
 * @access user
 * @description get cart items
 */
router.get("/", authenticate, getAllCartProductsController);

export default router;
