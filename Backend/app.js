import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./connectDB/connectDB.js";
import userRoute from "./routes/userRoute.js";
import organizerRoute from "./routes/organizerRoute.js";
import eventRoute from "./routes/eventRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

dotenv.config();

// Database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

//CORS Policy: Middleware
app.use(cors());
// JSON request parsing Middleware
app.use(express.json());

// API endpoints
app.use("/api/v1/user-auth", userRoute);
app.use("/api/v1/organizer-auth", organizerRoute);
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/event-review", reviewRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Event Review and Rating System APIs...");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
