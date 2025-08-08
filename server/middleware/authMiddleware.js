import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ email: decoded.email }).select("-password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: false,
      message: "Unauthorized user!",
    });
  }
};
