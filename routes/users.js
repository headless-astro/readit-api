var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const userController = require("../controllers/user.controller");

router.get("/current-user", authentication, userController.currentUser);

router.post("/login-customer", userController.loginUser);

router.post("/register-customer", userController.registerUser);

module.exports = router;
