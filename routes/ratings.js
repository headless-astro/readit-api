var express = require("express");
var router = express.Router();

const ratingController = require("../controllers/ratings.controller");

router.post("/get-rating", ratingController.getRating);

router.post("/user-rating", ratingController.getUserRating);

router.post("/remove-rating", ratingController.removeRating);

router.post("/set-rating", ratingController.setRating);

module.exports = router;
