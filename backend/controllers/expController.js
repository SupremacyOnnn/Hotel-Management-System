import Exp from "../models/expModel.js";

//create hotel
const createHotel = async (req, res) => {
  const hotelData = req.body; // Assuming the request body contains the data for the new hotel
  try {
    const newHotel = await Exp.create(hotelData);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Hotel
const getAllHotel = async (req, res) => {
  try {
    const Hotel = await Exp.find();
    res.status(200).json(Hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const Hotel = await Exp.findById(id);
    if (!Hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(Hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an Hotel by ID
const updateHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { country } = req.body;
    const updatedHotel = await Exp.findByIdAndUpdate(
      id,
      { country },
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an Hotel by ID
const deleteHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Exp.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHotelsByCountry = async (req, res) => {
  const { country } = req.params; // Assuming the country is provided as a URL parameter

  try {
    // Use the Exp model to find hotels with the specified country
    const hotels = await Exp.find({ country });

    if (hotels.length === 0) {
      // If no hotels found for the specified country, return a 404 status
      return res
        .status(404)
        .json({ message: "No hotels found for the specified country." });
    }

    // If hotels are found, return them
    res.status(200).json(hotels);
  } catch (error) {
    // Handle any errors that may occur during the database query
    res.status(500).json({ message: error.message });
  }
};
const getHotelsNameAndIdByCountry = async (req, res) => {
  const { countryName } = req.params; // Assuming the country name is passed in the request params

  try {
    // Find hotels in the specified country
    const hotels = await Exp.find({ country: countryName }, "name _id");

    // Extract hotel names and IDs
    const hotelData = hotels.map((hotel) => ({
      id: hotel._id,
      name: hotel.name,
    }));

    // Return the hotel data
    res.json(hotelData);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching hotels by country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createHotel,
  getAllHotel,
  getHotelById,
  updateHotelById,
  deleteHotelById,
  getHotelsByCountry,
  getHotelsNameAndIdByCountry,
};
