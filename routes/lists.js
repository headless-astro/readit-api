var express = require("express");
var router = express.Router();

const { authentication } = require("../middlewares/authentication");
const listController = require("../controllers/list.controller");

router.get("/list-current", authentication, listController.currentList);

router.post("/list-all", authentication, listController.getAllLists);

router.post("/create-list", authentication, listController.createList);

router.post("/delete-list", authentication, listController.deleteList);

module.exports = router;
