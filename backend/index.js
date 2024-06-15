const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db.js");
const router = require("./routes/router.js");

// Check if required environment variables are set
if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment variables");
  process.exit(1);
}

if (!process.env.PORT) {
  console.error("Missing PORT in environment variables");
  process.exit(1);
}

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port number ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
