const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "lists",
  new Schema({
    list_id: String,
    user_id: {
      type: String,
      required: true,
    },
    list_name: {
      type: String,
      required: true,
    },
    movies: {
      type: [{ title: { type: String }, posterUrl: { type: String } }],
      required: false,
    },
  }),
  "lists"
);
