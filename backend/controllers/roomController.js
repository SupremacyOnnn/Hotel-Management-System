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

export { getAllRooms, getRoomsByHotelId, createRoom };
