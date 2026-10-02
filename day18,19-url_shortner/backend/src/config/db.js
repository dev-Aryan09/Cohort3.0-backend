import mongoose from "mongoose";
import config from "./config.js";
import urlModel from "../models/url.model.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("DB connected successfully");
    /**
     this remove the "unique" key error, use ONLY in development, BUT it's slow at production level.
     In production, don't casually run syncIndexes() on every boot — do it deliberately/manually or via a migration script, since it can drop/rebuild indexes on live data.
     */
    await urlModel.syncIndexes();
  } catch (error) {
    console.log("Error in connecting DB", error);
  }
};
