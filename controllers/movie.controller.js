const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");
const hash = require("../helpers/hash.helper");
const movieModel = require("../models/movie.model");

exports.currentMovie = async (req, res) => {
  const { title } = req.body;

  var movieResult = await movieModel.where("title", title);
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
  };

  console.log(data);

  return res.json({
    success: true,
    message: "",
    data,
  });
};

exports.getAllMovies = async (req, res) => {
  var result = await movieModel.find();
  if (result === null) {
    return res.status(422).json({
      success: false,
      message: "No movie data.",
    });
  }

  var data = [];

  for (i = 0; i < result.length; i++) {
    const tempData = {
      uid: movieResult[i].id,
      title: movieResult[i].title,
      director: movieResult[i].director,
      description: movieResult[i].description,
      year: movieResult[i].year,
      rating: movieResult[i].rating,
      genres: movieResult[i].genres,
      cover: movieResult[i].cover,
    };

    data.push(tempData);
  }

  return res.json({
    success: true,
    message: "",
    data,
  });
};
