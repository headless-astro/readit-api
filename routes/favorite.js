var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const favoriteController = require("../controllers/favorite.controller");

router.get("/get-favorite", authentication, favoriteController.getUserFavorite);
router.delete(
  "/delete-favorite",
  authentication,
  favoriteController.deleteFavorite
);
router.post("/add-favorite", authentication, favoriteController.addFavorite);

module.exports = router;
