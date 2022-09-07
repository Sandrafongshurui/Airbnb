const bookingModel = require("../../models/booking");
const listingModel = require("../../models/listing");
const dateMethods = require("../../utils/dateMethods");
const luxon = require("luxon");
const DateTime = luxon.DateTime;

const bookingController = {
  showListingBookings: async (req, res) => {
    //taken from res.locals.userAuth, verrified at login
    //const userId = res.locals.userAuth.userId;
    const listingId = req.params.listing_id; //taken from FE <link> to
    try {
      const ListingBookings = await bookingModel.find({ listing: listingId });
      console.log(ListingBookings);
      return res.status(201).json(ListingBookings);
      s;
    } catch (error) {
      return res.status(500).json({ error: "failed to get listing bookings" });
    }
  },
  showTrips: async (req, res) => {
    const userId = "630f9ca501b6bed58f47cee5"; //take from res.local auth?
    try {
      const trips = await bookingModel
        .find({ booked_by: userId })
        .populate({ path: "listing" });
      console.log(trips);
      return res.json(trips);
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to list listings" });
    }
  },
  editTrip: async (req, res) => {
    const bookingId = req.params.booking_id; //taken from FE <link> to
    try {
      const booking = await bookingModel.findByIdAndUpdate(
        { _id: bookingId },
        { $set: { ...req.body } },
        { new: true }
      );
      if (!booking) {
        return res.status(404).json({ error: "Booking not found " });
      }
      console.log(booking);
      return res
        .status(201)
        .send(
          "Booking Updated Successfully, a notification has been sent to the host"
        );
    } catch (error) {
      return res.status(500).json({ error: "failed to update Booking" });
    }
  },
  deleteTrip: async (req, res) => {
    const bookingId = req.params.booking_id; //taken from FE <link> 
    let booking = null
    try {
      booking = await bookingModel.findById(bookingId).populate("listing");
      let idx = booking.listing.unavailable_dates.findIndex(element=> {
       return element[0].toString() == booking.checkin_date.toString()
      });
      const listing = await listingModel.findByIdAndUpdate(
        { _id: booking.listing._id },
        {$pull : {unavailable_dates : booking.listing.unavailable_dates[idx]}},
        {new: true}
      );
      console.log("------->",listing);
      await bookingModel.findByIdAndDelete(bookingId)
      return res.status(201).json("booking deleted Successfully");
    } catch (error) {
      return res.status(500).json({ error: "failed to delete booking" });
    }
  },
  bookTrip: async (req, res) => {
    //const listingId = "6316fda9d2571d6d3e58aef6"
    const listingId = req.params.listing_id; //take from FE link\
    const booked_by = "630f9ca501b6bed58f47cee5"; //take from res.local auth?
    const dateRangeArray = dateMethods.getDatesInRange(
      req.body.checkin_date,
      req.body.checkout_date
    );
    console.log("----->", dateRangeArray);
    //mongoose will change string date to the iso date in dbs
    try {
      const booking = await bookingModel.create({
        ...req.body,
        listing: listingId,
        booked_by,
      });
      const listing = await listingModel.findOneAndUpdate(
        { _id: listingId },
        { $push: { unavailable_dates: dateRangeArray } },
        { new: true }
      );
      if (!listing) {
        return res.status(404).send("Unable to find listing");
      }
    } catch (error) {
      return res.status(500).json({ error: "failed to create booking" });
    }
    return res.status(201).send("Booking Created Successfully");
  },
};

module.exports = bookingController;
