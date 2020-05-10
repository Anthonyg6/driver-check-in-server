require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const MONGODB_URI = process.env.MONGODB_URI;
const bodyParser = require("body-parser");

const checkInRoutes = require("./routes/checkIn");
const mongoose = require("mongoose");

corsOptions = {
  allowedHeaders: ["Access-Control-Allow-Origin"],
  origin: "https://driver-check-in.herokuapp.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/check-in", checkInRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("What MongoDB am I supposed to connect too?");
    console.error(error);
  });

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
