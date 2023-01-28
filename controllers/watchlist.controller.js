const config = require("../config");
const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");
const user = require("../controllers/user.controller");
const watchlistModel = require("../models/watchlist.model");

exports.addToWatchlist = async (req, res) => {
  const { title, userId } = req.body;
  var posterUrl = null;
  const movExists = await watchlistModel.findOne({
    userId: userId,
    movies: { $elemMatch: { title: title } },
  });
  if (movExists) {
    return res.json({
      success: false,
      message: "Movie in watchlist",
    });
  }
  const urlResult = await movieModel.findOne({ title: title });
  if (urlResult !== null) {
    posterUrl = urlResult.posterUrl;
  }

  var result = await watchlistModel.findOne({ userId: userId });

  await watchlistModel.updateOne(
    { _id: result.id },
    { $push: { movies: { title: title, posterUrl: posterUrl } } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.deleteFromWatchlist = async (req, res) => {
  const { title, userId } = req.body;
  const movExists = await watchlistModel.findOne({
    userId: userId,
    movies: { $elemMatch: { title: title } },
  });
  if (!movExists) {
    return res.json({
      success: false,
      message: "Movie not in watchlist",
    });
  }
  var result = await watchlistModel.findOne({
    userId: userId,
  });

  await watchlistModel.updateOne(
    { _id: result.id },
    { $pull: { movies: { title: title } } }
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

exports.inWatchlist = async (req, res) => {
  const { title, userid } = req.body;
  const result = await watchlistModel.findOne({
    userId: userid,
    movies: { $elemMatch: { title: title } },
  });
  var inWatchlist = false;

  if (result !== null) {
    inWatchlist = true;
  }

  return res.json({
    success: true,
    message: "is Favorite",
    data: inWatchlist,
  });
};
