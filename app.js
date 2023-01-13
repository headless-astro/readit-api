var express = require("express");
const cors = require("cors");
const config = require("./config");
const { authentication } = require("./middlewares/authentication");
require("./helpers/db.helper");
var app = express();

app.use(cors());

app.use((req, res, next) => {
  express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));

app.set("secretKey", config.secretKey);

app.use("/movies", require("./routes/movies"));
app.use("/lists", require("./routes/lists"));
app.use("/users", require("./routes/users"));

const port = config.port;

app.listen(port, () => {
  console.log("Server is running on: " + port);
});
