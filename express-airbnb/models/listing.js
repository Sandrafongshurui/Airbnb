const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      //required: true
    },
    property_type: {
      type: String,
      //required: true
    },
    accommodates: {
      type: Number,
      //required: true
    },
    bedrooms: {
      type: Number,
      //required: true
    },
    beds: {
      type: Number,
      //required: true
    },
    bathrooms: {
      type: Schema.Types.Decimal128,
      //required: true
    },
    amenities: [
      {
        type: String,
        enum: [
        "TV",
        "Cable TV",
        "Internet",
        "Wifi",
        "Air conditioning",
        "Pool",
        "Kitchen",
        "Free parking on premises",
        "Doorman",
        "Gym",
        "Elevator",
        "Buzzer/wireless intercom",
        "Family/kid friendly",
        "Washer",
        "Essentials",
        "24-hour check-in"
        ],
      },
    ],
    price: {
      type: Schema.Types.Decimal128,
      //required: true,
    },
    images_url: [
      {
        type: String,
        //required: true,
      },
    ],
    address_1: {
      type: String,
      // default: "",
    },
    address_2: {
      //this is only exposed to customer after reservation
      type: String,
      // default: "",
    },
    postal_code: {
      type: String,
      // default: "",
    },
    state: {
      type: String,
      // default: "",
    },
    country: {
      type: String,
      // default: "",
    },
    longtitude: {
      type: Schema.Types.Decimal128,
      // default: 0,
    },
    latitude: {
      type: Schema.Types.Decimal128,
      // default: 0,
    },
    unavailable_dates: [
      {
        type: Date,
      },
    ],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: mongoose.Types.ObjectId("630f9ca501b6bed58f47cee6"), //harry potter user
    }
},
{ timestamps: true }
);

const Listing = mongoose.model("yourlisting", listingSchema);

module.exports = Listing;
