var express = require("express");
var router = express.Router();

const listController = require("../controllers/list.controller");

router.post("/list-current", listController.currentList);

router.post("/all-lists", listController.getAllLists);

router.post("/create-list", listController.createList);

router.post("/delete-list", listController.deleteList);

router.post("/add-movie", listController.addMovie);

router.post("/remove-movie", listController.removeMovie);

module.exports = router;
