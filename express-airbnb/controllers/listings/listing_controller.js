const listingModel = require('../../models/listing')

const listingController = {
    listListings: async (req, res) => {
        let listings = []

        try {
            //incomplete
            //has filter
            if(req.body){
            //find country/state/city that match the req.body, put in an array
            listings = await listingModel.find({country: req.body.country})
            }else{
                listings = await listingModel.find({})
            }
           
            res.json(listings)
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list listings"})
        }

        
    },
    showListing: async (req, res) => {
        const listingId = req.params.listing_id//taken from FE <link> to
        try {
            
            const listing = await listingModel.findById(listingId).select('-__v')
            if (!listing) {
                return res.status(404).json()
            }
            return res.json(listing)
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to show listing"})
        }

    },
    listUserListings:async  (req, res) => {
        const userId = req.params.user_id//taken from FE <link> to
        try {
            const userListings = await listingModel.find({created_by: userId})
            if (!userListings) {
                return res.status(404).json()
            }
            return res.json(userListings)
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list user listings"})
        }

    },
    createListing:async  (req, res) => {
        try {
            
            let userId = req.params.user_id
            //ftech api to convert country/postal code to get long lat in FE
            const listing = await listingModel.create({
                ...req.body,
                created_by: userId
                //long
                //lat
            })
            if (!listing ) {
                return res.status(404).json()
            }
            return res.json(listing)
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to create listing"})
        }

    },
    updateListing:async  (req, res) => {
        //const userId = req.params.user_id//taken from FE <link> to
        const userId = req.params.user_id//taken from FE <link> to
        try {
            const userListings = await findById(req.body)
            if (!userListings) {
                return res.status(404).json()
            }
            return res.json(userListings)
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to update listing"})
        }

    },
    
    deleteListing:async  (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to delete listing"})
        }

    }

    
}


module.exports = listingController