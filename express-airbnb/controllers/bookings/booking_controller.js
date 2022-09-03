const bookingsModel = require('../models/booking')

const bookingController = {
    showTrips: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to list listings"})
        }

    },
    editTrips: (req, res) => {
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