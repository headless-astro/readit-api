const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "favorite",
  new Schema({
    UserId: {
      type: String,
      required: false,
    },
    MovieId: {
      type: String,
      required: false,
    },
  }),
  "favorite"
);
