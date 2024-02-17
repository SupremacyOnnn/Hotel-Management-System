import express from "express";
import {
  getAllHotel,
  getHotelById,
  getHotelsByCountry,
} from "../controllers/expController.js";

const router = express.Router();

// Route to get all Hotels
router.route("/").get(getAllHotel);
router.route("/hotels/:country").get(getHotelsByCountry);
router.route("/hotel/:id").get(getHotelById);

export default router;
