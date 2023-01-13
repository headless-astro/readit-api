const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");
const hash = require("../helpers/hash.helper");
const movieModel = require("../models/movie.model");

exports.currentMovie = async (req, res) => {
  const { uid } = req.decoded;

  var movieResult = await movieModel.findById(uid);
  if (movieResult === null) {
    return res.status(422).json({
      success: false,
      message: "Movie doesn't exist.",
    });
  }

  const data = {
    uid: movieResult.id,
    title: movieResult.title,
    director: movieResult.director,
    description: movieResult.description,
    year: movieResult.year,
    rating: movieResult.rating,
    genres: movieResult.genres,
    cover: movieResult.cover,
    description: movieResult.description,
  };

  console.log(data);

  return res.json({
    success: true,
    message: "",
    data,
  });
};
