import express from "express";
import {
  getLoginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin, employee } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(getLoginUser);
router.route("/register").post(registerUser);
router.post("/logout", logoutUser);
router.route("/profile").put(protect, updateUserProfile);

export default router;
