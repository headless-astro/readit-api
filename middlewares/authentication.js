const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authenticated.",
    });
    return;
  }

  jwt.verify(token, req.app.get("secretKey"), (error, decoded) => {
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
