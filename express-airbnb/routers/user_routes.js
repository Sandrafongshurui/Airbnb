const express = require('express')
const userController = require('../controllers/user_controller')
const authMiddleware = require('../middlewares/authmiddleware')

const router = express.Router()

//http://localhost:8000/api/v1/users/
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', authMiddleware, userController.logout)

//http://localhost:8000/api/v1/users/:user_id
router.get('/:user_id/profile', authMiddleware, userController.profile)//authMiddleware is used for any route that needs authentication
router.get('/:user_id/trips', authMiddleware, bookingController.profile)//see user upcoming trips
router.get('/:user_id/book/:listing_id', authMiddleware, bookingController.createBooking)//see user upcoming trips


module.exports = router
