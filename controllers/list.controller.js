const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");
const listModel = require("../models/list.model");
const userController = require("./user.controller");
const movieModel = require("../models/movie.model");

exports.createList = async (req, res) => {
  const { userid, listname } = req.body;

  const nameResult = await listModel
    .where("user_id", userid)
    .where("list_name", listname);

  if (nameResult.length > 0) {
    return res.status(422).json({
      success: false,
      message: "List already exists.",
      operation_date: new Date(),
    });
  }

  const list = await listModel.create({
    user_id,
    list_name,
    movies,
  });

  const data = {
    uid: list._id,
    userid: list.user_id,
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
  const { userid } = req.body;
  const result = await listModel.where("user_id", userid);
  console.log(userid);
  console.log(result);
  console.log(result.length);
  if (result === null) {
    return res.json({
      success: false,
      message: "User doesn't have any lists.",
    });
  }

  var data = [];

  for (i = 0; i < result.length; i++) {
    const tempData = {
      list_id: result[i]._id,
      user_id: userid,
      list_name: result[i].list_name,
      movies: result[i].movies,
    };

    data.push(tempData);
    console.log(tempData);
  }

  console.log(data);
  return res.json({
    success: true,
    message: "",
    data,
  });
};

exports.currentList = async (req, res) => {
  const { listname, userid } = req.body;

  const listResult = await listModel
    .where("list_name", listname)
    .where("user_id", userid);

  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  const data = {
    uid: listResult.id,
    userid: listResult.user_id,
    listname: listResult.list_name,
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

  const listResult = await listModel
    .where("list_name", listname)
    .where("user_id", userid);

  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  await listModel.deleteOne(listResult.list_id).where("user_id", userid);

  return res.json({
    success: true,
    message: "",
  });
};

exports.addMovie = async (req, res) => {
  const { listname, userid, title } = req.body;

  const listResult = await listModel
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
  const { listname, userid, title } = req.body;

  const listResult = await listModel
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
