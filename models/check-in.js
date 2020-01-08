const mongoose = require("mongoose");

const checkinSchema = mongoose.Schema({
  driverName: { type: String },
  carrier: { type: String },
  deliveryType: { type: String },
  checkInTime: { type: String }
});

module.exports = mongoose.model("CheckIn", checkinSchema);
