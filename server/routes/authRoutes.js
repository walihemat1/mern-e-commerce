import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", isAuthenticated, (req, res) => {
  const user = req.user;
  res.status(201).json({
    status: true,
    data: { user },
  });
});

export default router;
