import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBooking,
  createMultipleBooking,
  updateBooking,
  deleteBookingById,
  getAllBookings,
  getBookingById,
  getBookingsByHotelId,
  getBookingsByRoomId,
  getHighestQuantityRooms,
  getRoomsAvialabity,
} from "../controllers/bookingController.js";

const router = express.Router();

// Route to create a new booking
router.route("/").post(protect, createBooking).get(protect, getAllBookings);
router.route("/multipleBooking").post(protect, createMultipleBooking);
router.route("/bookingInRange").post(getHighestQuantityRooms);
router.route("/roomBookingInRange").post(getRoomsAvialabity);

// Route to update an existing booking by ID
router
  .route("/:id")
  .put(protect, updateBooking)
  .delete(protect, deleteBookingById)
  .get(protect, getBookingById);

//Read Booking
router.route("/hotel/:hotelId").get(getBookingsByHotelId);
router.route("/room/:hotelId").get(getBookingsByRoomId);

export default router;
