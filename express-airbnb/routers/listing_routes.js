const express = require('express')
const listingController = require('../controllers/listings/listing_controller')

const router = express.Router()

//http://localhost:8000/api/v1/
router.get('/', listingController.listListings)
router.get('/rooms/:listing_id', listingController.showListing)

//create, edit, delete each listing
//http://localhost:8000/api/v1/users/
router.get('/:user_id/listings', listingController.listUserListings)
router.post('/:user_id/listing', listingController.createListing)
router.patch('/:user_id/:listing_id', listingController.updateListing)
router.delete('/:user_id/:listing_id',listingController.deleteListing)


module.exports = router
