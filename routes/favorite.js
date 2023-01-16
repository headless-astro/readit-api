var express = require("express");
var router = express.Router();

const favoriteController = require("../controllers/favorite.controller");

router.post(
  "/get-favorites",

  favoriteController.getUserFavorites
);
router.post(
  "/delete-favorite",

  favoriteController.deleteFavorite
);
router.post("/add-favorite", favoriteController.addFavorite);

module.exports = router;
