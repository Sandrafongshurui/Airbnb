const express = require('express')
const userController = require('../controllers/user_controller')
const bookingController = require('../controllers/booking_controller')
const authMiddleware = require('../middlewares/authmiddleware')

const router = express.Router()

//http://localhost:8000/api/v1/users/
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

//add authMiddleware is used for any route that needs authentication
router.get('/:user_id/profile', userController.showProfile)
router.patch('/:user_id/profile', userController.editProfile)
router.delete('/:user_id/profile', userController.deleteProfile)

router.get('/:user_id/trips', bookingController.showTrips)//see user upcoming trips
router.patch('/:user_id/trip/:listing_id', bookingController.editTrip)
router.delete('/:user_id/trip/:listing_id', bookingController.deleteTrip)
router.post('/:user_id/book/:listing_id',bookingController.bookTrip)


module.exports = router
