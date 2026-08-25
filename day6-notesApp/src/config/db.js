const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/notes-app");
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
};

module.exports = connectDB;
