const express = require("express");
const CheckIn = require("../models/check-in");

const router = express.Router();

router.post("/", async (req, res, next) => {
  let checkIn = new CheckIn({
    date: req.body.date,
    driverName: req.body.driverName,
    carrier: req.body.carrier,
    deliveryType: req.body.deliveryType,
    truckType: req.body.truckType,
    checkInTime: req.body.checkInTime,
    checkOutTime: req.body.checkOutTime
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

router.delete("/:id", (req, res, next) => {
  CheckIn.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Driver Check-In delete" });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

router.get("/:id", (req, res, next) => {
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

router.get("/", (req, res, next) => {
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

module.exports = router;
