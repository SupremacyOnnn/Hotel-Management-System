import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCancelledBooking,
  getAllCancelBookings,
  getCancelBookingById,
  getCancelBookingsByHotelId,
  getCancelBookingsByRoomId,
  getCancelBookingsByUserId,
} from "../controllers/cancelController.js";

const router = express.Router();
router.route("/").post(createCancelledBooking).get(getAllCancelBookings);
router.route("/:id").get(getCancelBookingById);
router.route("/hotel/:hotelId").get(getCancelBookingsByHotelId);
router.route("/room/:roomId").get(getCancelBookingsByRoomId);
router.route("/user/:userId").get(getCancelBookingsByUserId);

export default router;
