import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Not authorized, token failed" });
      }
    } else {
      res.status(401).json({ error: "Not Logged in,Not authorized, no token" });
    }
  } catch (error) {
    console.error("Error logging in Token:", error);
    res.status(500).json({ error: "Internal Token Error" });
  }
};

// User must be an Employee
const employee = (req, res, next) => {
  if (req.user && req.user.isEmployee) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin, employee };
