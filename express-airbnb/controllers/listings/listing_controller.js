const listingModel = require("../../models/listing");

const listingController = {
  listListings: async (req, res) => {
    let listings = null;
    try {
      //incomplete
      //has filter
      if (req.body.filterValue) {
        console.log("has body");
        //find country/state/city that match the req.body, put in an array
        listings = await listingModel.find({ country: req.body.filterValue });
        if (!listing) {
          return res.status(404).json();
        }
        return res.json(listings);
      } else {
        console.log("get lists");
        listings = await listingModel.find().limit(20);
        if (!listing) {
          return res.status(404).json();
        }
        return res.json(listings);
      }
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to list listings" });
    }
  },
  showListing: async (req, res) => {
    const listingId = req.params.listing_id; //taken from FE <link> to
    try {
      const listing = await listingModel
        .findById({ _id: listingId })
        .select("-__v");
      if (!listing) {
        return res.status(404).json();
      }
      return res.json(listing);
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to show listing" });
    }
  },
  showHostListings: async (req, res) => {
    //taken from res.locals.userAuth, verrified at login 
    //const userId = res.locals.userAuth.userId; 
    const userId = "630f9ca501b6bed58f47cee6"; 
    try {
      const userListings = await listingModel.find({ created_by: userId }).limit(20);
      if (!userListings) {
        return res.status(404).json();
      }
      console.log(userListings);
      return res.json(userListings);
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to list user listings" });
    }
  },
  createListing: async (req, res) => {
    //const userId = res.locals.userAuth.userId; //taken from res.locals.userAuth, verrified at login 
    const userId =" 630f9ca501b6bed58f47cee6"; 
    try {
      //ftech api to convert country/postal code to get long lat in FE
      const listing = await listingModel.create({
        ...req.body,
        created_by: userId,
        //long
        //lat
      });
      if (!listing) {
        return res.status(404).json();
      }
      console.log("created sucessfully");
      return res.status(201).send("Listing Created Successfully");
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to create listing" });
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
      if(!listing){
        return res.status(404).json();
      }
      console.log(listing);
      return res.status(201).send("Listing Updated Successfully");
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to update listing" });
    }
  },

  deleteListing: async (req, res) => {
    //const userId = req.params.user_id//taken from FE <link> to
    const listingId = req.params.listing_id; //taken from FE <link> to
    try {
     const listing = await listingModel.findByIdAndDelete(listingId);
     if(!listing){
        return res.status(404).json();
      }
      return res.status(201).send("Listing deleted Successfully");
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to delete listing" });
    }
  },
};

module.exports = listingController;
