const config = require("../config");
const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");
const user = require("../controllers/user.controller");

exports.addFavorite = async (req, res) => {
  const { title, userId } = req.body;

  var favoriteExists = await favoriteModel.findOne({
    movies: title,
    userId: userId,
  });
  if (favoriteExists) {
    return res.status(422).json({
      success: false,
      message: "Movie already in favorites",
    });
  }

  var favoritesResult = await favoriteModel.findOne({ userId: userId });

  await favoriteModel.updateOne(
    { _id: favoritesResult.id },
    { $push: { movies: title } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.deleteFavorite = async (req, res) => {
  const { title, userId } = req.body;

  var favoritesResult = await favoriteModel.findOne({
    movies: title,
    userId: userId,
  });

  if (!favoritesResult) {
    return res.status(422).json({
      success: false,
      message: "Movie not in favorites",
    });
  }
  console.log(favoritesResult.id);

  await favoriteModel.updateOne(
    { _id: favoritesResult.id },
    { $pull: { movies: title } }
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
