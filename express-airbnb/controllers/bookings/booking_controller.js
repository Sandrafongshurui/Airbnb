const bookingModel = require('../../models/booking')

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
    bookTrip: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to create listing"})
        }

    }
   
}

module.exports = bookingController