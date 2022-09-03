const listingsModel = require('../models/listing')

const listingController = {
    listlistings: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list listings"})
        }

    },
    showlisting: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to show listing"})
        }

    },
    listUserListings: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list user listings"})
        }

    },
    createListing: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to create listing"})
        }

    },
    updateListing: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to update listing"})
        }

    },
    
    deleteListing: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to delete listing"})
        }

    }

    
}