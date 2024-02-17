import express from "express";
const router = express.Router();
import {
  getAllCountries,
  createCountry,
} from "../controllers/countryController.js";

// Route to get all countries
router.route("/").get(getAllCountries);

// Route to create a new country
router.route("/").post(createCountry);

export default router;
