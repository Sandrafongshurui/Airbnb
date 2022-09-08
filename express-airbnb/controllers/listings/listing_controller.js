const listingModel = require("../../models/listing");
const bookingModel = require('../../models/booking')

const listingController = {
  listListings: async (req, res) => {
    let listings = null;
    try {
      if (req.query.country) {
        console.log(req.query.country);
        //find country/state/city that match the req.body, put in an array
        listings = await listingModel.find({ country: req.query.country });
        return res.json(listings);
      } else {
        console.log("get lists");
        listings = await listingModel.find({}).limit(20)
        if (listings.length === 0) {//find returns array
          return res.status(404).json({ error: "no listing results" });
        }
        return res.json(listings);
      }
    } catch (error) {    
      return res.status(500).json({ error: "failed to list listings" });
    }
  },
  showListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    try {
      const listing = await listingModel
        .findById({ _id: listingId })
        .select("-__v");
        if(!listing){
          return res.status(404).json({ error: "No such listing" });
        }
        return res.json(listing);
    } catch (error) {
      return res.status(500).json({ error: "failed to show listing" });
    }
    
  },
  listHostListings: async (req, res) => {
    //taken from res.locals.userAuth, verrified at login 
    //const userId = res.locals.userAuth.userId; 
    const userId = "630f9ca501b6bed58f47cee5"; 
    try {
      const userListings = await listingModel.find({ created_by: userId });
      console.log(userListings);
      return res.json(userListings);
    } catch (error) {
      
      return res.status(500).json({ error: "failed to list user listings" });
    }
  },
  createListing: async (req, res) => {
    //const userId = res.locals.userAuth.userId; //taken from res.locals.userAuth, verrified at login 
    const userId = "630f9ca501b6bed58f47cee6"; 
    console.log(req.body)
    try {
      //ftech api to convert country/postal code to get long lat in FE
      const listing = await listingModel.create({
        ...req.body,
        created_by: userId
        //long
        //lat
      });
      console.log(listing)
      if (!listing) {
        return res.status(404).json();
      }
      return res.status(201).send("Listing Created Successfully");
    } catch (error) {
      
      return res.status(500).json({ error: "failed to create listing" });
    }
  },
  editListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    try {
      const listing = await listingModel.findByIdAndUpdate(
        { _id: listingId },
        { $set: { ...req.body } },
        { new: true }
      );   
      return res.status(201).send("Listing Updated Successfully");
    } catch (error) {
      
      return res.status(500).json({ error: "failed to update listing" });
    }
  },

  deleteListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    console.log(listingId)
    try {
     const listing = await listingModel.findByIdAndDelete(listingId);
     await bookingModel.deleteMany({listing : listingId})
     console.log(listing)
     if(!listing){
        return res.status(404).json({error:"No listing exists"});
      }
      return res.status(201).json("Listing deleted Successfully");
    } catch (error) {
      
      return res.status(500).json({ error: "failed to delete listing" });
    }
  },
};

module.exports = listingController;
