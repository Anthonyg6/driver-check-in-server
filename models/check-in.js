const mongoose = require("mongoose");

const checkinSchema = mongoose.Schema({
  date: { type: String },
  driverName: { type: String },
  carrier: { type: String },
  deliveryType: { type: String },
  truckType: { type: String },
  checkInTime: { type: String },
  checkOutTime: { type: String }
});

module.exports = mongoose.model("CheckIn", checkinSchema);
