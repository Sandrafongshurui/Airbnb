const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    default: mongoose.Types.ObjectId("631631c51ae686c7ccd8a920"), //harry potter user
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    default: mongoose.Types.ObjectId("631631c51ae686c7ccd8a920"), //harry potter user
  },
  checkin_date: {
    type: Date,
  },
  checkin_date: {
    type: Date,
  },
  pax: {
    type: Nimber,
  },
},{timestamp:true});

const Booking = mongoose.model("Booking", listingSchema);

module.exports = Booking
