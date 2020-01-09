const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const CheckIn = require("./models/check-in");

const checkInRoutes = require("./routes/checkIn");

const app = express();

mongoose
  .connect(
    "mongodb+srv://AnthonyGallegos:n6hVxRAmH9r6uYg7@cluster0-roxtp.mongodb.net/Check-In?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch(error => {
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

app.use(bodyParser.json());

app.use("/check-in", checkInRoutes);
module.exports = app;
