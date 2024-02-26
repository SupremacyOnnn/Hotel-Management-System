import Cancel from "../models/cancelModel.js";
import Booking from "../models/bookingModel.js";
import moment from "moment";
const createCancelledBooking = async (req, res) => {
  const bookingsData = req.body;
  try {
    const newBookings = [];
    const {
      picture,
      bookingId,
      hotelId,
      roomId,
      userId,
      roomName,
      country,
      city,
      startDate,
      endDate,
      quantity,
      price,
      totalPrice,
      isCancelled,
    } = bookingsData;
    const parsedStartDate = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const parsedEndDate = moment.utc(endDate, "DD-MM-YYYY").toDate();
    const newBooking = await Cancel.create({
      picture,
      bookingId,
      hotelId,
      roomId,
      userId,
      roomName,
      country,
      city,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      quantity,
      price,
      totalPrice,
      isCancelled,
    });
    await Booking.findOneAndDelete({ _id: bookingId });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCancelBookings = async (req, res) => {
  try {
    const bookings = await Cancel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a booking by ID
const getCancelBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Cancel.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get bookings by hotel ID
const getCancelBookingsByHotelId = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const bookings = await Cancel.find({ hotelId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get bookings by room ID
const getCancelBookingsByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const bookings = await Cancel.find({ roomId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCancelBookingsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Cancel.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createCancelledBooking,
  getAllCancelBookings,
  getCancelBookingById,
  getCancelBookingsByHotelId,
  getCancelBookingsByRoomId,
  getCancelBookingsByUserId,
};
