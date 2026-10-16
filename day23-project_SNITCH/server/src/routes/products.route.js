import express from "express";
import { createProductValidator } from "../validators/product.validator.js";

const router = express.Router();

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * @access seller
 * @param req.body=>{title,,description, price:{amount,currency} ,sizes:[{size,stock},{size,stock}]}
 */
router.post("/", createProductValidator ,async (req, res) => {});

export default router;
