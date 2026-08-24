const express = require("express");
const app = express();

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://09aryanlucky_db_user:CBbDgzSIgSZnsAHw@cohortcluster.c3zj1q4.mongodb.net/",
  );
  console.log("DB connected successfully...");
};

connectDB();

app.get("/", (req, res) => {
  res.send({
    message: "Okay, get it!!",
  });
});

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
