import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//route: /api/auth/register
// @desc: create a new user
// @accss: Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email: email });

    if (checkUser)
      return res.status(400).json({
        status: false,
        message: "User already exits!",
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: true,
      message: "User was created successfully!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || error,
    });
  }
};

//route: /api/auth/login
// @desc: logins a user
// @accss: Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email: email });
    if (!checkUser)
      return res.status(404).json({
        status: false,
        message: "User not found!",
      });

    const hashedPassword = checkUser.password;
    const matchedPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchedPassword) {
      return res.status(401).json({
        status: false,
        message: "Incorrect password! Try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      status: true,
      message: "Logged in successfully!",
      data: {
        user: {
          email: checkUser.email,
          id: checkUser._id,
          username: checkUser.username,
          role: checkUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// logout
const logoutUser = async (req, res) => {
  res.clearCookie("token", "").status(200).json({
    status: true,
    message: "Logged out successfully!",
  });
};

// auth middleware
const auth = async (req, res, next) => {};

export { registerUser, loginUser, logoutUser, auth };
