const express = require('express')
const listingController = require('../controllers/listings/listing_controller')

const router = express.Router()

//http://localhost:8000/api/v1/rooms/
router.get('/', authMiddleware, listingController.listListings)
router.get('/:listing_id', authMiddleware, listingController.showListing)

//create, edit, delete each listing
router.get('/:user_id/hosting/listings', authMiddleware, listingController.profile)
router.post('/:user_id/hosting/', authMiddleware, listingController.profile)
router.patch('/:user_id/hosting/:listing_id', authMiddleware, listingController.profile)
router.delete('/:user_id/hosting/:listing_id', authMiddleware, listingController.profile)


module.exports = router
