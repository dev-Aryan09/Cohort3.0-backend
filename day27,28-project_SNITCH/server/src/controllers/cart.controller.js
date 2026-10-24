import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const selectedSize = product.sizes.find((s) => s.size === size);

  // checking size avaibalility
  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid Size",
    });
  }

  // checking stock
  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insufficient Stock",
    });
  }

  // cart
  /**
  const cart = await cartModel.findOne({ user: req.user.userId });
  
  if (!cart) {
    await cartModel.create({ user: req.user.userId });
  }
  */

  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  const productInCart = cart.products.find(
    (p) => p.product.toString() === productId && p.size === size, // p.product -> MongoId, productId -> String value from req.body
  );

  if (productInCart) {
    if (productInCart.quantity + quantity > selectedSize.stock) {
      return res.status(400).json({
        message: "Insufficient Stock",
      });
    }

    await cartModel.updateOne(
      {
        user: req.user.userId,
        "products.product": productId,
        "products.size": size,
      },
      {
        $inc: { "products.$.quantity": quantity },
      },
    );

    return res.status(200).json({
      message: "Product quantity updated successfully",
    });
  }

  await cartModel.findOneAndUpdate(
    {
      user: req.user.userId,
    },
    {
      $push: {
        products: {
          product: productId,
          size: size,
          quantity: quantity,
        },
      },
    },
  );

  return res.status(200).json({
    success: true,
    message: "Product added to cart successfully",
  });
};

export const getAllCartProductsController = async (req, res) => {
  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  return res.status(200).json({
    success: true,
    message: "Cart products fetched successfully",
    data: {
      cart,
    },
  });
};
