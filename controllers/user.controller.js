const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");
const hash = require("../helpers/hash.helper");
const userModel = require("../models/user.model");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  let emailResult = await userModel.where("email", email);

  if (emailResult.length > 0) {
    return res.status(422).json({
      success: false,
      message: "Email is in use.",
      operation_date: new Date(),
    });
  }

  const hashResult = await hash.encrypt(password);

  const profile_id = await hash.encrypt("user-" + email);

  const user = await userModel.create({
    profile_id,
    username,
    email,
    password: hashResult,
  });

  const data = {
    uid: user.id,
    email: user.email,
    username: user.username,
  };

  return res.json({
    success: true,
    message: "",
    data,
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const userResult = await userModel.findOne({ username: username });
  if (userResult === null) {
    return res.status(422).json({
      success: false,
      message: "Invalid user.",
    });
  }

  const hashResult = await hash.compare(password, userResult.password);
  if (!hashResult) {
    return res.status(422).json({
      success: false,
      message: "Wrong password.",
    });
  }

  const data = {
    uid: userResult.id,
    email: userResult.email,
    username: userResult.username,
  };

  const token = jwt.sign(data, req.app.get("secretKey"), {
    expiresIn: 604800,
  });

  return res.json({
    success: true,
    message: "",
    data,
    token,
  });
};

exports.currentUser = async (req, res) => {
  const { uid } = req.decoded;

  var userResult = await userModel.findById(uid);
  if (userResult === null) {
    return res.status(422).json({
      success: false,
      message: "Invalid user.",
    });
  }

  const data = {
    uid: userResult.id,
    profile_id: userResult.profile_id,
    email: userResult.email,
    username: userResult.first_name,
  };

  console.log(data);

  return res.json({
    success: true,
    message: "",
    data,
  });
};
