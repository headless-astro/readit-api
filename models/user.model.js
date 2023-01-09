const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "users",
  new Schema({
    profile_id: String,
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }),
  "users"
);
