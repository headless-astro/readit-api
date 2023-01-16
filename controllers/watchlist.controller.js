const config = require("../config");
const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");
const user = require("../controllers/user.controller");
const watchlistModel = require("../models/watchlist.model");

exports.addToWatchlist = async (req, res) => {
  const { title, userId } = req.body;

  var movieExists = await watchlistModel.findOne({
    movies: title,
    userId: userId,
  });
  if (movieExists) {
    return res.status(422).json({
      success: false,
      message: "Movie already in watchlist",
    });
  }

  var result = await watchlistModel.findOne({ userId: userId });

  if (result === null) {
    const watchlist = await watchlistModel.create({
      userId,
      movies,
    });

    result = await watchlistModel.findOne({ userId: userId });
  }

  await watchlistModel.updateOne(
    { _id: result.id },
    { $push: { movies: title } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.deleteFromWatchlist = async (req, res) => {
  const { title, userId } = req.body;

  var result = await watchlistModel.findOne({
    movies: title,
    userId: userId,
  });

  if (!result) {
    return res.status(422).json({
      success: false,
      message: "Movie not in watchlist",
    });
  }
  console.log(result.id);

  await watchlistModel.updateOne(
    { _id: result.id },
    { $pull: { movies: title } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.getUserWatchlist = async (req, res) => {
  const { userid } = req.body;
  const result = await watchlistModel.findOne({ userId: userid });

  if (result === null) {
    return res.json({
      success: false,
      message: "No movie in watchlist",
    });
  }

  const data = result.movies;

  return res.json({
    success: true,
    message: "Watchlist Data",
    data,
  });
};
