const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "movies",
  new Schema({
    movie_id: String,
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: false,
    },
    rating: {
      type: String,
      required: false,
    },
    genres: {
      type: [String],
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
  }),
  "movies"
);
