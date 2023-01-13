var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const userController = require("../controllers/user.controller");

router.get("/current-user", authentication, userController.currentUser);

router.post("/login-user", userController.loginUser);

router.post("/register-user", userController.registerUser);

module.exports = router;
