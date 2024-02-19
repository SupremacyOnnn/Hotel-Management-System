import Booking from "../models/bookingModel.js";
// import Room from "../models/roomModel.js";
// Controller to create a new booking
const createBooking = async (req, res) => {
  const bookingData = req.body;
  try {
    const newBooking = await Booking.create(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to update an existing booking by ID
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete a booking by ID
const deleteBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get bookings by hotel ID
const getBookingsByHotelId = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const bookings = await Booking.find({ hotelId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get bookings by room ID
const getBookingsByRoomId = async (req, res) => {
  const { roomId } = req.params;
  try {
    const bookings = await Booking.find({ roomId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export {
  createBooking,
  updateBooking,
  deleteBookingById,
  getAllBookings,
  getBookingById,
  getBookingsByHotelId,
  getBookingsByRoomId,
};
