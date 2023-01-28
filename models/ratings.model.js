const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "ratings",
  new Schema({
    rating_id: String,
    title: {
      type: String,
      required: true,
    },
    ratings: {
      type: [{ user_id: { type: String }, rating: { type: String } }],
      required: false,
    },
  }),
  "ratings"
);
