const express = require('express')
const userController = require('../controllers/users/user_controller')
const bookingController = require('../controllers/bookings/booking_controller')
const listingController = require('../controllers/listings/listing_controller')
//const authMiddleware = require('../middlewares/authmiddleware')


const router = express.Router()

//http://localhost:8000/api/v1/user
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)


//add authMiddleware is used for any route that needs authentication
router.get('/profile', userController.showProfile)
router.patch('/profile', userController.editProfile)
router.delete('/profile', userController.deleteProfile)

router.get('/trips', bookingController.showTrips)//see user upcoming trips
router.patch('/trip/:listing_id', bookingController.editTrip)
router.delete('/trip/:listing_id', bookingController.deleteTrip)
router.post('/book/:listing_id',bookingController.bookTrip)

//create, edit, delete each listing
router.get('/listings', listingController.showHostListings)
router.post('/listing', listingController.createListing)
router.patch('/listing/:listing_id', listingController.editListing)
router.delete('/listing/:listing_id',listingController.deleteListing)


module.exports = router
