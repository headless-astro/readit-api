const mongoose = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connect.");
  })
  .catch((error) => {
    console.log("Database connection problem, error:", error);
  });
