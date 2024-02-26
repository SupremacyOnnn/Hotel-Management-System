import Exp from "../models/expModel.js";

const createHotel = async (req, res) => {
  const hotelData = req.body;
  try {
    const newHotel = await Exp.create(hotelData);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllHotel = async (req, res) => {
  try {
    const Hotel = await Exp.find();
    res.status(200).json(Hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  const { country } = req.params;

  try {
    const hotels = await Exp.find({ country });

    if (hotels.length === 0) {
      return res
        .status(404)
        .json({ message: "No hotels found for the specified country." });
    }
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getHotelsNameAndIdByCountry = async (req, res) => {
  const { countryName } = req.params;

  try {
    const hotels = await Exp.find({ country: countryName }, "name _id ");
    const hotelData = hotels.map((hotel) => ({
      id: hotel._id,
      name: hotel.name,
    }));
    res.json(hotelData);
  } catch (error) {
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
