const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
};

module.exports = connectDB;
