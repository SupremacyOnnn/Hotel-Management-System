import mongoose from "mongoose";

// // Define the schema for the room
// const roomSchema = new mongoose.Schema({
//   roomId: {
//     type: mongoose.Schema.Types.ObjectId,
//     // required: true,
//     unique: true,
//   },
//   roomName: String,
//   about: String,
//   view: String,
//   roomSize: String,
//   qty: Number,
//   picture: String,
//   price: Number,
//   booking: [String], // Assuming booking IDs are stored as strings
// });

// // Define the schema for hotel rooms
// const hotelRoomsSchema = new mongoose.Schema({
//   hotelRef: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Hot",
//   },
//   rooms: [roomSchema], // Embedding room schema as subdocuments
// });

// Define the room schema
const hotelRoomsSchema = new mongoose.Schema({
  hotelRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hot",
  },
  roomName: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  view: String,
  roomSize: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  picture: String,
  price: {
    type: Number,
    required: true,
  },
  booking: [String],
});

// Create the model
const Hotelroom = mongoose.model("Hotelroom", hotelRoomsSchema);

export default Hotelroom;
