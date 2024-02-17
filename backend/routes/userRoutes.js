import express from "express";
import { getLoginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(getLoginUser);
router.route("/register").post(registerUser);

export default router;
