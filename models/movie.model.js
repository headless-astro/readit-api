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
    plot: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: false,
    },
    genres: {
      type: [String],
      required: false,
    },
    posterUrl: {
      type: String,
      required: false,
    },
    runtime: {
      type: String,
      required: true,
    },
    actors: {
      type: String,
      required: false,
    },
  }),
  "movies"
);
