var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const movieController = require("../controllers/movie.controller");

router.get("/current-movie", authentication, movieController.currentMovie);

module.exports = router;
