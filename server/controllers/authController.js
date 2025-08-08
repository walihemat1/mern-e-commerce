import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//route: /api/auth/register
// desc: create a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "User was created successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: error.message || error,
    });
  }
};

// login
const login = async (req, res) => {};

// logout
const logout = async (req, res) => {};

// auth middleware
const auth = async (req, res, next) => {};

export { registerUser, login, logout, auth };
