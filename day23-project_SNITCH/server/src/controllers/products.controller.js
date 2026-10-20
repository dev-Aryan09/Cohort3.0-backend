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
