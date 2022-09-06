const bookingModel = require('../../models/booking')
const listingModel = require("../../models/listing");
const { DateTime } = require("luxon");

const bookingController = {
    showListingBookings: async (req, res) => {
        //taken from res.locals.userAuth, verrified at login 
        //const userId = res.locals.userAuth.userId; 
        const listingId =  req.params.listing_id; //taken from FE <link> to
        let ListingBookings = []
        try {
          ListingBookings = await bookingModel.find({ listing: listingId });
          console.log(ListingBookings);
          //if no booking return empty array
          return res.json(ListingBookings);
        } catch (error) {
          res.status(500);
          return res.json({ error: "failed to list user listings" });
        }
      },
    showTrips: async (req, res) => {
        const userId =  req.params.listing_id; //taken from FE <link> to
        let trips = []
        try {
            trips = await bookingModel.find({ user: userId }).populate({path: "listing"});
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list listings"})
        }

    },
    editTrip: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to show listing"})
        }

    },
    deleteTrip: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list user listings"})
        }

    },
    bookTrip: async (req, res) => {
        const listingId = req.params.listing_id//take from FE link
        // try {
        //     //DateTime.fromISO(req.body.checkin_date)
        //     //DateTime.fromISO(req.body.checkout_date)
        //     console.log("Checkin_date iso format ---->", req.body.checkin_date)
        //     console.log("Checkout_date iso format ---->", req.body.checkout_date)
        // } catch (error) {
        //     res.status(500).json({error: "Booking dates need to be YYYY-MM-DD format"})
        // }
        //calculate the duration
        try {
            const booking = await bookingModel.create({
                ...req.body,
                listing: listingId
            })
            console.log(booking)
            // const listing = await listingModel.findOneAndUpdate(
            //     {_id:listingId },
            //     {$push:{unavailable_Dates : }}
            // )
            if (!booking ) {
                return res.status(404).json();
            }
            return res.status(201).send("Booking Created Successfully");
        } catch (error) {
          
            return res.status(500).json({error: "failed to create booking"})
        }

    }
   
}

module.exports = bookingController