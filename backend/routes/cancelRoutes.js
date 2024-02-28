import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createCancelledBooking,
  getAllCancelBookings,
  getCancelBookingById,
  getCancelBookingsByHotelId,
  getCancelBookingsByRoomId,
  getCancelBookingsByUserId,
  updateCancelBooking,
} from "../controllers/cancelController.js";

const router = express.Router();
router
  .route("/")
  .post(protect, createCancelledBooking)
  .get(protect, admin, getAllCancelBookings);
router.route("/:id").get(protect, getCancelBookingById);
router.route("/:id/update").patch(protect, updateCancelBooking);
router.route("/hotel/:hotelId").get(protect, getCancelBookingsByHotelId);
router.route("/room/:roomId").get(protect, getCancelBookingsByRoomId);
router.route("/user/:userId").get(protect, getCancelBookingsByUserId);

export default router;
