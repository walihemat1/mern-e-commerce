import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required!"],
    unique: [true, "username should be unique!"],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: [true, "email should be unique!"],
  },
  password: {
    type: String,
    required: [true, "password is required!"],
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
