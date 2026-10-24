import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  images: {
    type: [
      {
        type: String,
      },
    ],
    validate: {
      validator: (images) => images.length <= 5,
      message: "A product can have at most 5 images",
    },
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: {
        values: ["INR", "USD"],
        message: "{value} is not a supported currency", // Dynamically injects the invalid value
      },
      default: "INR",
    },
  },
  sizes: [
    {
      size: {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL"],
          message: "{value} is not a supported size",
        },
        required: true,
      },
      stock: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  ],
  published: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;

/**
 *
 *.       product :{
 *.
 *.       title:"test title 1",
 *.       description:"test description 1",
 *.       images:["https://imagekit.io_1","https://imagekit.io_2"],
 *.       price:{amount:100,currency:"INR"},
 *.       sizes:[
 *.       { size:"M",stock:20 },
 *.       { size:"XL",stock:40}
 *.       ],
 *.       seller: seller_id
 *.
 *.       }
 *
 */
