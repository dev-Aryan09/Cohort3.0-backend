import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email must be unique"],
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["seller", "user"],
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
