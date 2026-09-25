import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [40, "Name must be at most 40 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  // accessToken: {  // do NOT store in DB
  //   type: String,  // store in memory (context/redux)
  // },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
