const movieModel = require("../models/movie.model");

exports.getAllMovies = async (req, res) => {
  const movieResult = await movieModel.find({});
  if (movieResult === null) {
    return res.status(422).json({
      success: false,
      message: "No movie data.",
    });
  }

  return res.json(movieResult);
};

exports.currentMovie = async (req, res) => {
  const { title } = req.body;

  const movieResult = await movieModel.findOne({ title: title });
  if (movieResult === null) {
    return res.status(422).json({
      success: false,
      message: "Movie doesn't exist.",
    });
  }

  return res.json({
    success: true,
    message: "",
    data: movieResult,
  });
};
