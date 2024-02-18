import mongoose from "mongoose";

const expSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  inspiration: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  mainPicture: [
    {
      picture: String,
      info: String,
      about: String,
    },
  ],
  aboutPicture: [String],
  // rooms: [
  //   {
  //     roomName: String,
  //     about: String,
  //     view: String,
  //     roomSize: String,
  //     qty: Number,
  //     picture: String,
  //     price: Number,
  //   },
  // ],
  // dine: Boolean,
  // dineAbout: String,
  // dinePlace: [
  //   {
  //     name: String,
  //     about: String,
  //     phone: String,
  //     picture: String,
  //   },
  // ],
  // amenities: Boolean,
  // amenitiesAbout: String,
  // amenitiesList: [
  //   {
  //     name: String,
  //     about: String,
  //     picture: String,
  //   },
  // ],
});

const Exp = mongoose.model("Hot", expSchema);

export default Exp;
