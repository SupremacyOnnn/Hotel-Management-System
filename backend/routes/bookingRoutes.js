import express from "express";
import {
  createBooking,
  updateBooking,
  deleteBookingById,
  getAllBookings,
  getBookingById,
  getBookingsByHotelId,
  getBookingsByRoomId,
} from "../controllers/bookingController.js";

const router = express.Router();

// Route to create a new booking
router.route("/").post(createBooking).get(getAllBookings);

// Route to update an existing booking by ID
router
  .route("/:id")
  .put(updateBooking)
  .delete(deleteBookingById)
  .get(getBookingById);

//Read Booking
router.route("/hotel/:hotelId").get(getBookingsByHotelId);
router.route("/room/:hotelId").get(getBookingsByRoomId);

export default router;
