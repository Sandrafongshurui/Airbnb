const express = require('express')
const userController = require('../controllers/users/user_controller')
const bookingController = require('../controllers/bookings/booking_controller')
const listingController = require('../controllers/listings/listing_controller')
//const authMiddleware = require('../middlewares/authmiddleware')


const router = express.Router()

//http://localhost:8000/api/v1/users/
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

//http://localhost:8000/api/v1/users/:user_id
//add authMiddleware is used for any route that needs authentication
router.get('/:user_id/profile', userController.showProfile)
router.patch('/:user_id/profile', userController.editProfile)
router.delete('/:user_id/profile', userController.deleteProfile)

router.get('/:user_id/trips', bookingController.showTrips)//see user upcoming trips
router.patch('/:user_id/trip/:listing_id', bookingController.editTrip)
router.delete('/:user_id/trip/:listing_id', bookingController.deleteTrip)
router.post('/:user_id/book/:listing_id',bookingController.bookTrip)

//create, edit, delete each listing
router.get('/:user_id/listings', listingController.listUserListings)
router.post('/:user_id/', listingController.createListing)
router.patch('/:user_id/:listing_id', listingController.updateListing)
router.delete('/:user_id/:listing_id',listingController.deleteListing)


module.exports = router
