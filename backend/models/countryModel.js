import mongoose from "mongoose";
const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
