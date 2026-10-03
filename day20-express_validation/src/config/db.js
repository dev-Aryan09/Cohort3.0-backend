import mongoose from "mongoose";
import config from "./config.js";
import userModel from "../models/user.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB connected successfully");
    await userModel.syncIndexes()
  } catch (error) {
    console.log("Error in connecting DB", error);
  }
};

export default connectDB;
