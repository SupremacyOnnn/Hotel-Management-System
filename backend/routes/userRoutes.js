import express from "express";
import {
  getLoginUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";
import { protect, admin, employee } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(getLoginUser);
router.route("/register").post(registerUser);
router.post("/logout", logoutUser);

export default router;
