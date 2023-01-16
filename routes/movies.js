var express = require("express");
var router = express.Router();

const movieController = require("../controllers/movie.controller");

router.post("/current-movie", movieController.currentMovie);

router.get("/all-movies", movieController.getAllMovies);

module.exports = router;
