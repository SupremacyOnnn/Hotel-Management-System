import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import hotelRoutes from "../backend/routes/expRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

app.get("/", (res, req) => {
  res.send("API is running...");
});

app.use("/api/hotel", hotelRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/user", userRoutes);
app.listen(port, () => console.log(`Server running at ${port}`));
