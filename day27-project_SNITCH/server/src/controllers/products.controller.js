import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProductController = async (req, res) => {
  const { title, description, price, sizes } = req.body;

  // [array]
  const images = req.files;
  const imageUrls = [];

  for (let i = 0; i < images.length; i++) {
    // const buffer = ;
    // const filename = ;
    const response = await uploadFile({
      buffer: images[i].buffer,
      filename: images[i].originalname,
    });
    imageUrls.push(response.url);
  }

  const product = await productModel.create({
    title,
    description,
    price,
    sizes,
    images: imageUrls,
    seller: req.user.userId,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: {
      product,
    },
  });
};

export const fetchAllProductsUser = async (req, res) => {
  // fetch ONLY published products
  const products = await productModel.find({
    published: true,
  });

  return res.status(200).json({
    succes: true,
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
};

export const fetchAllProductsSeller = async (req, res) => {
  // fetch all products
  const products = await productModel.find();

  return res.status(200).json({
    succes: true,
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
};

export const unlistProductController = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // --------------- make product unPublished ---------------
  await productModel.findByIdAndUpdate(id, {
    published: false,
  });

  return res.status(200).json({
    succes: true,
    message: "Product unpublished successfully",
  });
};

export const listProductController = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // --------------- make product listed ---------------
  await productModel.findByIdAndUpdate(id, {
    published: true,
  });

  return res.status(200).json({
    succes: true,
    message: "Product published successfully",
  });
};
