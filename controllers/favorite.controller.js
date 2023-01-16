const config = require("../config");
const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");
const user = require("../controllers/user.controller");

exports.addFavorite = async (req, res) => {
  const { title, userId } = req.body;

  var favoriteExists = favoriteModel.find({ movies: title, userId: userId });
  if (favoriteExists) {
    return res.status(422).json({
      success: false,
      message: "Movie already in favorites",
    });
  }

  var favoritesResult = favoriteModel.find({ userId: userId });

  if (favoritesResult === null) {
    const favs = await favoriteModel.create({
      userId,
      movies,
    });

    favoritesResult = favoriteModel.find({ userId: userId });
  }

  favoriteModel.updateOne(
    { _id: favoritesResult._id },
    { $push: { movies: title } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.deleteFavorite = async (req, res) => {
  const { title, userId } = req.body;

  var favoriteResult = favoriteModel.find({ movies: title, userId: userId });

  if (!favoriteResult) {
    return res.status(422).json({
      success: false,
      message: "Movie not in favorites",
    });
  }

  favoriteModel.updateOne(
    { _id: favoritesResult._id },
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
  console.log(result);
  console.log(result.movies);

  if (result.length === null) {
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
