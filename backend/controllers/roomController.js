import Room from "../models/roomModel.js";

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching Rooms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRoomsByHotelId = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const rooms = await Room.findOne({ hotelRef: hotelId });
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching Rooms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRoom = async (req, res) => {
  const { roomRef, rooms } = req.body; // corrected from RoomRef to roomRef
  try {
    const room = new Room({ roomRef, rooms }); // corrected from Room to room
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error("Error creating Room:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const { roomRef, rooms } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(
      roomId,
      { roomRef, rooms },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    console.error("Error updating Room:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("Error deleting Room:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllRooms, getRoomsByHotelId };
