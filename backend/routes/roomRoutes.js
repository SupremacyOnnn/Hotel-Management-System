import express from "express";
import {
  getAllRooms,
  getRoomsByHotelId,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").get(getAllRooms);
router.route("/:hotelId").get(getRoomsByHotelId);

export default router;
