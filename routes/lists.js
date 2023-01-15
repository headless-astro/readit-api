var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const listController = require("../controllers/list.controller");

router.get("/list-current", authentication, listController.currentList);

router.get("/all-lists", authentication, listController.getAllLists);

router.post("/create-list", authentication, listController.createList);

router.post("/delete-list", authentication, listController.deleteList);

router.post("/add-movie", authentication, listController.addMovie);

router.post("/remove-movie", authentication, listController.removeMovie);

module.exports = router;
