const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");
const hash = require("../helpers/hash.helper");
const listModel = require("../models/list.model");

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

  const list_id = await hash.encrypt("user-" + listname);

  const list = await listModel.create({
    list_id,
    profile_id,
    list_name,
    movie_id,
  });

  const data = {
    uid: list.id,
    userid: list.profile_id,
    listname: list.list_name,
    movies: list.movie_id,
  };

  return res.json({
    success: true,
    message: "",
    data,
  });
};

exports.getAllLists = async (req, res) => {
  const { profileid } = req.body;

  var result = await listModel.findAll(profileid);
  if (result === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have any lists.",
    });
  }

  var data = [];

  for (i = 0; i < result.length; i++) {
    const tempData = {
      uid: result[i].id,
      userid: result[i].profile_id,
      listname: result[i].list_name,
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

exports.currentList = async (req, res) => {
  const { uid, profileid } = req.decoded;

  var listResult = await listModel.findById(uid).where("profile_id", profileid);
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
    movies: listResult.movie_id,
  };

  console.log(data);

  return res.json({
    success: true,
    message: "",
    data,
  });
};
exports.deleteList = async (req, res) => {
  const { uid, profileid } = req.body;

  var listResult = await listModel.findById(uid).where("profile_id", profileid);

  if (listResult === null) {
    return res.status(422).json({
      success: false,
      message: "User doesn't have such a list.",
    });
  }

  await userResult.deleteOne(uid).where("profile_id", profileid);

  return res.json({
    success: true,
    message: "",
  });
};
