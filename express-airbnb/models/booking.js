const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  booked_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    //default: mongoose.Types.ObjectId("630f9ca501b6bed58f47cee5"), //mickey mouse user
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    //default: mongoose.Types.ObjectId("631631c51ae686c7ccd8a920"), //harry potter user
  },
  checkin_date: {
    type: Date,
  },
  checkout_date: {
    type: Date,
  },
  total_guests: {
    type: Number,
  },
},{timestamp:true});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking
