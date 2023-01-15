const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");
const listModel = require("../models/list.model");
const userController = require("./user.controller");
const movieModel = require("../models/movie.model");

exports.createList = async (req, res) => {
  const { profileid, listname } = req.body;

  let nameResult = await listModel
    .where("profile_id", profileid)
    .where("list_name", listname);

  if (nameResult.length > 0) {
    return res.status(422).json({
      success: false,
      message: "List already exists.",
      operation_date: new Date(),
    });
  }

  const list = await listModel.create({
    profile_id,
    list_name,
    movies,
  });

  const data = {
    uid: list._id,
    userid: list.profile_id,
    listname: list.list_name,
    movies: list.movies,
  };

  return res.json({
    success: true,
    message: "",
    data,
  });
};

exports.getAllLists = async (req, res) => {
  let user = await userController.getUserId(req, res);
  var result = await listModel.find({ user_id: user });
  if (result === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have any lists.",
    });
  }

  var data = [];

  for (i = 0; i < result.length; i++) {
    const tempData = {
      listId: result[i]._id,
      userId: user,
      listName: result[i].list_name,
      movies: result[i].movie_id,
    };

    data.push(tempData);
  }

  return res.json({
    success: true,
    message: "",
    data,
  });
};

/*exports.currentList = async (req, res) => {
  const { listname, profileid } = req.decoded;

  var listResult = await listModel
    .where("list_name", listname)
    .where("profile_id", profileid);
  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  const data = {
    uid: listResult.id,
    userid: listResult.profile_id,
    listname: listResult.list_name,
    movies: listResult.movies,
  };

  console.log(data);

  return res.json({
    success: true,
    message: "",
    data,
  });
};*/

exports.currentList = async (req, res) => {
  const uid = req.query.listId;
  let user = await userController.getUserId(req, res);
  var listResult = await listModel.findById(uid).where("user_id", user);
  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  /*mids = listResult.movie_id;
  listOfMovie = [];
  for (let i = 0; i < mids.length; i++) {
    let movie = await movieModel.find({ Id: mids[i] });
    listOfMovie.push({
      movie: movie[0],
    });
  }*/

  const data = {
    listId: uid,
    userId: listResult.user_id,
    listName: listResult.list_name,
    movies: listResult.movies,
  };

  console.log(data);

  return res.json({
    success: true,
    message: "",
    data,
  });
};

exports.deleteList = async (req, res) => {
  const { listname, userid } = req.body;

  var listResult = await listModel
    .where("list_name", listname)
    .where("user_id", userid);

  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  await listModel.deleteOne(listResult.list_id).where("profile_id", profileid);

  return res.json({
    success: true,
    message: "",
  });
};

/*exports.deleteList = async (req, res) => {
  const uid = req.query.listId;
  let user = await userController.getUserId(req, res);
  var result = await listModel.findByIdAndDelete(uid).where("user_id", user);
  return res.json({
    success: true,
    message: "",
    data: result,
  });
};
*/
exports.addMovie = async (req, res) => {
  const { listname, userid, title } = req.decoded;

  var listResult = await listModel
    .where("list_name", listname)
    .where("user_id", userid);

  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  listModel.updateOne(
    { _id: listResult.list_id },
    { $push: { movies: title } }
  );

  return res.json({
    success: true,
    message: "",
  });
};

exports.removeMovie = async (req, res) => {
  const { listname, userid, title } = req.decoded;

  var listResult = await listModel
    .where("list_name", listname)
    .where("user_id", userid);

  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  listModel.updateOne(
    { _id: listResult.list_id },
    { $pull: { movies: title } }
  );

  return res.json({
    success: true,
    message: "",
  });
};
