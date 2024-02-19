import mongoose from "mongoose";
const hotelRoomsSchema = new mongoose.Schema({
  hotelRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hot",
  },
  roomName: {
    type: String,
    required: true,
  },
  country: {
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
