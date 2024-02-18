import express from "express";
import {
  getAllRooms,
  getRoomsByHotelId,
  createRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:hotelId").get(getRoomsByHotelId);

export default router;
