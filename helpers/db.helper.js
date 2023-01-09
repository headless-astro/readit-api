const mongoose = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongo connect.");
  })
  .catch((error) => {
    console.log("Database connection problem, error:", error);
  });

mongoose.set("useCreateIndex", true);
