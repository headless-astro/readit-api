const config = require("../config");
const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");
const user = require("../controllers/user.controller");

exports.addFavorite = async (req, res) => {
  const { title, userId } = req.body;
  var posterUrl = null;

  const favExists = await favoriteModel.findOne({
    userId: userId,
    movies: { $elemMatch: { title: title } },
  });
  if (favExists) {
    return res.json({
      success: false,
      message: "Movie already in favorites",
    });
  }

  const urlResult = await movieModel.findOne({ title: title });
  if (urlResult !== null) {
    posterUrl = urlResult.posterUrl;
  }
  var favoritesResult = await favoriteModel.findOne({ userId: userId });

  await favoriteModel.updateOne(
    { _id: favoritesResult.id },
    { $push: { movies: { title: title, posterUrl: posterUrl } } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.deleteFavorite = async (req, res) => {
  const { title, userId } = req.body;
  const favExists = await favoriteModel.findOne({
    userId: userId,
    movies: { $elemMatch: { title: title } },
  });
  if (!favExists) {
    return res.json({
      success: false,
      message: "Movie not in favorites",
    });
  }
  var favoritesResult = await favoriteModel.findOne({
    userId: userId,
  });

  await favoriteModel.updateOne(
    { _id: favoritesResult.id },
    { $pull: { movies: { title: title } } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.getUserFavorites = async (req, res) => {
  const { userid } = req.body;
  const result = await favoriteModel.findOne({ userId: userid });

  if (result === null) {
    return res.json({
      success: false,
      message: "No favorites",
    });
  }

  const data = result.movies;

  return res.json({
    success: true,
    message: "Favorite Data",
    data,
  });
};

exports.isFavorite = async (req, res) => {
  const { title, userid } = req.body;
  const result = await favoriteModel.findOne({
    userId: userid,
    movies: { $elemMatch: { title: title } },
  });
  var isFavorite = false;

  if (result !== null) {
    isFavorite = true;
  }

  return res.json({
    success: true,
    message: "is Favorite",
    data: isFavorite,
  });
};
