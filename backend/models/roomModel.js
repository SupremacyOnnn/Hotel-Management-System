import mongoose from "mongoose";

// Define the schema
const roomSchema = new mongoose.Schema({
  roomName: String,
  about: String,
  view: String,
  roomSize: String,
  qty: Number,
  picture: String,
  price: Number,
  booking: [String], // Assuming booking IDs are stored as strings
});

const hotelSchema = new mongoose.Schema({
  hotelRef: String,
  rooms: [roomSchema], // Embedding room schema as subdocuments
});

// Create the model
const Room = mongoose.model("rooms", hotelSchema);

export default Room;
