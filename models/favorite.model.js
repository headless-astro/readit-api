const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "favorite",
  new Schema({
    userId: {
      type: String,
      required: true,
    },
    movies: {
      type: [String],
      required: false,
    },
  }),
  "favorite"
);