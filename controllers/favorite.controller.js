const config = require("../config");
const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");
const user = require("../controllers/user.controller");

exports.addFavorite = async (req, res) => {
  await favoriteModel.create({
    UserId: await user.getUserId(req, res),
    MovieId: req.query.movie_id,
  });
};

exports.deleteFavorite = async (req, res) => {
  await favoriteModel.deleteOne({
    UserId: await user.getUserId(req, res),
    _id: req.query.favorite_id,
  });
  return res.json({
    success: true,
    message: "Favorite Deleted",
  });
};

exports.getUserFavorite = async (req, res) => {
  let data = await favoriteModel.find({
    UserId: await user.getUserId(req, res),
  });
  listOfFavorite = [];
  for (let i = 0; i < data.length; i++) {
    let movie = await movieModel.find({ Id: data[i].MovieId });
    listOfFavorite.push({
      favoriteId: data[i]._id,
      movie: movie[0],
    });
  }
  return res.json({
    success: true,
    message: "Favorite Data",
    data: listOfFavorite,
  });
};
