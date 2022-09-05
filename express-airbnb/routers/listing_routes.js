const express = require('express')
const listingController = require('../controllers/listings/listing_controller')

const router = express.Router()

//http://localhost:8000/api/v1/
router.get('/', listingController.listListings)//returns []
router.post('/', listingController.listListings)//search filter, return []
router.get('/listings/:listing_id', listingController.showListing)//return {}


module.exports = router
