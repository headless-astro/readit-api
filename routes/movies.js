var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const movieController = require("../controllers/movie.controller");

router.get("/current-movie", authentication, movieController.currentMovie);

router.get("/all-movies", authentication, movieController.getAllMovies);

module.exports = router;
