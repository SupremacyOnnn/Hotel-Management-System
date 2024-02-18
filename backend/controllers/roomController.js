import HotelRoom from "../models/roomModel.js";

const getAllRooms = async (req, res) => {
  try {
    const rooms = await HotelRoom.find();
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching Rooms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRoomsByHotelId = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const rooms = await HotelRoom.find({ hotelRef: hotelId });
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching Rooms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRoom = async (req, res) => {
  // const rooms = req.body; // corrected from RoomRef to roomRef
  // try {
  //   const room = new HotelRoom(rooms); // corrected from Room to room
  //   await room.save();
  //   res.status(201).json(room);
  // } catch (err) {
  //   console.error("Error creating Room:", err);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
  try {
    let roomData = req.body;
    if (!Array.isArray(roomData)) {
      roomData = [roomData];
    }
    const createdRooms = [];
    for (const data of roomData) {
      const newRoom = new HotelRoom(data);
      await newRoom.save();
      createdRooms.push(newRoom);
    }
    res
      .status(201)
      .json({ message: "Rooms created successfully", rooms: createdRooms });
  } catch (error) {
    console.error("Error creating rooms:", error);
    res.status(500).json({ error: "Failed to create rooms" });
  }
};

const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const { roomRef, rooms } = req.body;
  try {
    const room = await HotelRoom.findByIdAndUpdate(
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
    const room = await HotelRoom.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("Error deleting Room:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllRooms, getRoomsByHotelId, createRoom };
