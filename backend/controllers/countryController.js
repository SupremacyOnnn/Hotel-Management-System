import Country from "../models/countryModel.js";
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCountry = async (req, res) => {
  const { country } = req.body;
  try {
    const newCountry = new Country({ country });
    await newCountry.save();
    res.status(201).json(newCountry);
  } catch (err) {
    console.error("Error creating country:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllCountries, createCountry };
