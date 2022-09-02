const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: true
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
        //required: true
      },
    ],
    price: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    images: [
      {
        type: Object,
        required: true,
      },
    ],
    address: {
      address: { type: String, default: "" },//this is only exposed to customer after reservation
      street: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      postal_code: { type: String, default: "" },
      location: {
        coordinates: [
          {
            type: Schema.Types.Mixed,
            default: "",
          },
        ],
      },
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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myListing", listingSchema);
