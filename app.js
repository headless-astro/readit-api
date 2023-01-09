var express = require("express");
const cors = require("cors");
const config = require("./config");

const { authentication } = require("./middlewares/authentication");

var app = express();

app.use(cors());
app.use("/users", require("./routes/users"));

const port = config.port;

app.listen(port, () => {
  console.log("Server is running on: " + port);
});
