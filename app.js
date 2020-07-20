// SSE (Server sent Events)
// WSS (websockets for real time messages) Socket.IO
// DB Triggers (db sends message and fires a function)
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const MONGODB_URI = process.env.MONGODB_URI;
const bodyParser = require("body-parser");

const checkInRoutes = require("./routes/checkIn");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   return res.status(200).send("<h1>Driver Check In API</h1>");
// });
app.use("/check-in", checkInRoutes);
app.use("/auth", userRoutes);

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    try {
      console.log("Connected To MongoDB");
    } catch (err) {
      console.log("What MongoDB am I supposed to connect too?");
      console.error(error);
    }
  }
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

module.exports = app;
