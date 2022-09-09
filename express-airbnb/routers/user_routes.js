const express = require('express')
const userController = require('../controllers/users/user_controller')
const bookingController = require('../controllers/bookings/booking_controller')
const listingController = require('../controllers/listings/listing_controller')
const validation = require ("../middlewares/validation/validation")
const listingValidators = require("../middlewares/validation/validators/listingValidators")
const userValidators = require("../middlewares/validation/validators/userValidators")
//const createListing = require ("../middlewares/validation/Validators/createListing")
//const editListing = require ("../middlewares/validation/validators/editListing")
const authMiddleware = require('../middlewares/authorization/authmiddleware')

//http://localhost:8000/api/v1/user
const router = express.Router()


router.post('/register', validation(userValidators.register), userController.register)// returns 201
router.post('/login', validation(userValidators.login),userController.login)// returns 201
router.post('/logout', userController.logout)// returns 201


//add authMiddleware is used for any route that needs authentication
router.get('/profile', userController.showProfile)//returns {}
router.patch('/profile', validation(userValidators.register), userController.editProfile)// returns 201
router.delete('/profile', userController.deleteProfile)// returns 201

router.get('/trips', bookingController.showTrips)//returns []
router.patch('/trip/:booking_id',validation(listingValidators.params_id),validation(listingValidators.createBooking), bookingController.editTrip)// returns 201
router.delete('/trip/:booking_id', validation(listingValidators.params_id), bookingController.deleteTrip)// returns 201
router.post('/book/:listing_id', validation(listingValidators.params_id), validation(listingValidators.createBooking),validation(listingValidators.createBooking), bookingController.bookTrip)// returns 201

//get,create, edit, delete each listing
router.get('/listings', listingController.listHostListings)//returns []
router.get('/listing/:listing_id', validation(listingValidators.params_id), bookingController.showListingBookings)//returns []
router.post('/listing', validation(listingValidators.createListing), listingController.createListing)//return 201
router.patch('/listing/:listing_id', validation(listingValidators.params_id),validation(listingValidators.createListing),listingController.editListing)// returns 201
router.delete('/listing/:listing_id', validation(listingValidators.params_id), listingController.deleteListing)// return 201


module.exports = router
