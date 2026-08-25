const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://09aryanlucky_db_user:CBbDgzSIgSZnsAHw@cohortcluster.c3zj1q4.mongodb.net/",
  );
  console.log("DB connected successfully...");
};

module.exports = connectDB;
