import express from "express";
import {
  getAllRooms,
  getRoomsByHotelId,
  createRoom,
  getRoomsByRoomId,
} from "../controllers/roomController.js";

const router = express.Router();

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:hotelId").get(getRoomsByHotelId);
router.route("/getRooms/:id").get(getRoomsByRoomId);

export default router;
