const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const CheckIn = require("./models/check-in");

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

app.post("/check-in", (req, res, next) => {
  let checkIn = new CheckIn({
    driverName: req.body.driverName,
    carrier: req.body.carrier,
    deliveryType: req.body.deliveryType,
    checkInTime: req.body.checkInTime
  });
  checkIn
    .save()
    .then(() => {
      res.status(201).json({
        message: "New Driver Check In post has been created!"
      });
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});

app.delete("/check-in/:id", (req, res, next) => {
  CheckIn.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Driver Check-In delete" });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get("/check-in/:id", (req, res, next) => {
  CheckIn.findOne({
    _id: req.params.id
  })
    .then(CheckIn => {
      res.status(200).json(CheckIn);
    })
    .catch(error => {
      res.status(404).json({
        error
      });
    });
});

app.use("/check-in", (req, res, next) => {
  CheckIn.find()
    .then(checkIns => {
      res.status(200).json(checkIns);
    })
    .catch(error => {
      res.status(400).json({
        error
      });
    });
});
module.exports = app;
