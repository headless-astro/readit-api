var express = require("express");
var router = express.Router();

const watchlistController = require("../controllers/watchlist.controller");

router.post("/get-watchlist", watchlistController.getUserWatchlist);
router.post("/delete-watchlist", watchlistController.deleteFromWatchlist);
router.post("/add-watchlist", watchlistController.addToWatchlist);

module.exports = router;
