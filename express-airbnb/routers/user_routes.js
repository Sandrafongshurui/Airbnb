const express = require('express')
const userController = require('../controllers/users/user_controller')
const bookingController = require('../controllers/bookings/booking_controller')
const listingController = require('../controllers/listings/listing_controller')
//const authMiddleware = require('../middlewares/authmiddleware')


const router = express.Router()

//http://localhost:8000/api/v1/user
router.post('/register', userController.register)// returns 201
router.post('/login', userController.login)// returns 201
router.post('/logout', userController.logout)// returns 201


//add authMiddleware is used for any route that needs authentication
router.get('/profile', userController.showProfile)//returns {}
router.patch('/profile', userController.editProfile)// returns 201
router.delete('/profile', userController.deleteProfile)// returns 201

router.get('/trips', bookingController.showTrips)//returns []
router.patch('/trip/:booking_id', bookingController.editTrip)// returns 201
router.delete('/trip/:booking_id', bookingController.deleteTrip)// returns 201
router.post('/book/:listing_id',bookingController.bookTrip)// returns 201

//get,create, edit, delete each listing
router.get('/listings', listingController.listHostListings)//returns []
router.get('/listing/:listing_id', bookingController.showListingBookings)//returns []
router.post('/listing', listingController.createListing)//return 201
router.patch('/listing/:listing_id', listingController.editListing)// returns 201
router.delete('/listing/:listing_id',listingController.deleteListing)// return 201


module.exports = router
