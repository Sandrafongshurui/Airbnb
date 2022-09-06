const bookingModel = require("../../models/booking");
const listingModel = require("../../models/listing");
const dateMethods = require("../../utils/dateMethods");
const luxon = require("luxon")
const DateTime = luxon.DateTime

const bookingController = {
  showListingBookings: async (req, res) => {
    //taken from res.locals.userAuth, verrified at login
    //const userId = res.locals.userAuth.userId;
    const listingId = req.params.listing_id; //taken from FE <link> to
    try {
      const ListingBookings = await bookingModel.find({ listing: listingId });
      console.log(ListingBookings);
      return res.status(201).json(ListingBookings);s
    } catch (error) {
     
      return  res.status(500).json({ error: "failed to get listing bookings" });
    }
  },
  showTrips: async (req, res) => {
    const userId = "630f9ca501b6bed58f47cee5"; //take from res.local auth?
    try {
      const trips = await bookingModel
        .find({ booked_by: userId })
        .populate({ path: "listing" });
        console.log(trips)
        return res.json(trips)
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
      if(!booking ){
        return res.status(404).json({error:"Booking not found "});
      }
      console.log(booking );
      return res.status(201).send("Booking Updated Successfully, a notification has been sent to the host");
    } catch (error) {
      
      return res.status(500).json({ error: "failed to update Booking" });
    }
  },
  deleteTrip: async (req, res) => {
    const bookingId = req.params.booking_id; //taken from FE <link> to
    console.log(bookingId)
    try {
    const booking = await bookingModel.findById(bookingId).populate({ path: "listing" });
    if(!bookingId){
        return res.status(404).json({error:"No booking exists"});
      }
    console.log(booking.listing.unavailable_dates)
    const arrayOfDates = booking.listing.unavailable_dates
    arrayOfDates.forEach((element, idx )=> {
        console.log(element[0].toString(), booking.checkin_date.toString())
        if(element[0].toString() == booking.checkin_date.toString()){
            console.log("same date", idx)
            arrayOfDates.splice(idx,1)            
        }
    });
    console.log(arrayOfDates)
    console.log(booking)
    //booking.delete
    
      return res.status(201).json("booking deleted Successfully");
    } catch (error) {
      
      return res.status(500).json({ error: "failed to delete booking" });
    }
  },
  bookTrip: async (req, res) => {
    //const listingId = "631631c51ae686c7ccd8a920"
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
      if (!booking) {
        return res.status(404).json();
      }
    } catch (error) {
      return res.status(500).json({ error: "Error with booking information" });
    }

    try {
      const listing = await listingModel.findOneAndUpdate(
        { _id: listingId },
        { $push: { unavailable_dates: dateRangeArray } },
        { new: true }
      );
      console.log(listing);
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
