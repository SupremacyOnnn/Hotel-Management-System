import Booking from "../models/bookingModel.js";
import moment from "moment";
// import Room from "../models/roomModel.js";
// Controller to create a new booking
const createBooking = async (req, res) => {
  const bookingsData = req.body;
  try {
    const newBookings = [];
    const {
      hotelId,
      roomId,
      userId,
      roomName,
      country,
      city,
      startDate,
      endDate,
      quantity,
      totalPrice,
      // isPaid,
    } = bookingsData;

    // Parse startDate and endDate
    const parsedStartDate = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const parsedEndDate = moment
      .utc(endDate, "DD-MM-YYYY")
      .subtract(1, "day")
      .toDate();

    const existingBookings = await Booking.find({
      roomId,
      hotelId,
      startDate: { $lte: parsedEndDate },
      endDate: { $gte: parsedStartDate },
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: "Villa already booked" });
    }

    // Create the booking
    const newBooking = await Booking.create({
      hotelId,
      roomId,
      userId,
      roomName,
      country,
      city,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      quantity,
      totalPrice,
      // isPaid,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createMultipleBooking = async (req, res) => {
  const bookingsData = req.body;
  try {
    const newBookings = [];
    for (const bookingData of bookingsData) {
      const {
        hotelId,
        roomId,
        userId,
        roomName,
        country,
        city,
        startDate,
        endDate,
        quantity,
        totalPrice,
        // isPaid,
      } = bookingData;

      // Parse startDate and endDate
      const parsedStartDate = moment.utc(startDate, "DD-MM-YYYY").toDate();
      const parsedEndDate = moment
        .utc(endDate, "DD-MM-YYYY")
        .subtract(1, "day")
        .toDate();

      const existingBookings = await Booking.find({
        roomId,
        hotelId,
        startDate: { $lte: parsedEndDate },
        endDate: { $gte: parsedStartDate },
      });

      if (existingBookings.length > 0) {
        return res.status(400).json({ message: "Villa already booked" });
      }

      // Create the booking
      const newBooking = await Booking.create({
        hotelId,
        roomId,
        userId,
        roomName,
        country,
        city,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        quantity,
        totalPrice,
        // isPaid,
      });

      newBookings.push(newBooking);
    }

    res.status(201).json(newBookings);
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

const getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getHighestQuantityRooms = async (req, res) => {
  const { hotelId, startDate, endDate } = req.body;
  // res.status(200).json({ hotelId, startDate, endDate });
  try {
    const parsedStartDate = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const parsedEndDate = moment
      .utc(endDate, "DD-MM-YYYY")
      .subtract(1, "day")
      .toDate();
    const existingBookings = await Booking.find({
      hotelId,
      startDate: { $lte: parsedEndDate },
      endDate: { $gte: parsedStartDate },
    });
    res.status(200).json(existingBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomsAvialabity = async (req, res) => {
  const { roomId, startDate, endDate } = req.body;
  // res.status(200).json({ hotelId, startDate, endDate });
  try {
    const parsedStartDate = moment.utc(startDate, "DD-MM-YYYY").toDate();
    const parsedEndDate = moment
      .utc(endDate, "DD-MM-YYYY")
      .subtract(1, "day")
      .toDate();
    const existingBookings = await Booking.find({
      roomId,
      startDate: { $lte: parsedEndDate },
      endDate: { $gte: parsedStartDate },
    });
    res.status(200).json(existingBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getBookingsBeforeCurrentDate = async (req, res) => {
//   const { userId } = req.params;
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() - 1);
//   try {
//     const bookings = await Booking.find({
//       userId,
//       endDate: { $lt: currentDate },
//     }).sort({ startDate: 1 });
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const getBookingsOnOrAfterCurrentDate = async (req, res) => {
//   const { userId } = req.params;
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() - 1);
//   try {
//     const bookings = await Booking.find({
//       userId,
//       endDate: { $gte: currentDate },
//     }).sort({ startDate: 1 });
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export {
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
  getBookingsByUserId,
  // getBookingsBeforeCurrentDate,
  // getBookingsOnOrAfterCurrentDate,
};
