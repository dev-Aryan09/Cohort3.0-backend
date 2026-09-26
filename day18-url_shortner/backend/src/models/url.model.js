import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    //The long link we redirect to
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2048,
    },
    //The 6-character code in the short link
    shortCode: {
      type: {
        type: String,
        required: true,
        unique: [true, "Short code must be unique"],
      },
    },
    //How many times the link was opened
    clicks: {
      type: true,
      default: 0,
    },
  },
  { timestamps: true },
);
