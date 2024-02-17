import mongoose from "mongoose";
const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model("country", countrySchema);

export default Country;
