require('./../config/config');
var express = require('express');
var router = express.Router();

const SearchController = require('./../controllers/searchController');
const searchController = new SearchController();

/* GET home page. */
router.get('/', searchController.showSearchPanel);


//Send back the searchresults from the yelp API
router.post('/term', searchController.getSearchResults);


// Going or not?
router.post('/going', searchController.goingPlaces);

module.exports = router;
