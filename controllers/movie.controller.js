const movieModel = require("../models/movie.model");

exports.getAllMovies = async (req, res) => {
  var movieResult = await movieModel.find({});
  console.log(movieResult);
  if (movieResult === null) {
    return res.status(422).json({
      success: false,
      message: "Movie doesn't exist.",
    });
  }

  return res.json(movieResult);
};

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
