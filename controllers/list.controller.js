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
    movies,
  });

  const data = {
    uid: list.id,
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
  const { profileid } = req.body;

  var result = await listModel.find().where("profile_id", profileid);
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
      movies: result[i].movies,
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
};

exports.deleteList = async (req, res) => {
  const { listname, profileid } = req.body;

  var listResult = await listModel
    .where("list_name", listname)
    .where("profile_id", profileid);

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

exports.addMovie = async (req, res) => {
  const { listname, profileid, title } = req.decoded;

  var listResult = await listModel
    .where("list_name", listname)
    .where("profile_id", profileid);

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
  const { listname, profileid, title } = req.decoded;

  var listResult = await listModel
    .where("list_name", listname)
    .where("profile_id", profileid);

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
