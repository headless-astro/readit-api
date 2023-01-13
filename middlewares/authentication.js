const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  const temptoken = req.headers["authorization"];
  var token = "";
  if (temptoken) {
    token = temptoken.split(" ")[1];
  } else {
    token = temptoken;
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authenticated.",
    });
    return;
  }

  jwt.verify(token, req.app.get("secretKey"), function (error, decoded) {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Expired token.",
      });
    }

    req.decoded = decoded;
    next();
  });
};
