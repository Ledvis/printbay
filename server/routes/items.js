const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");

router.route("/").get(itemsController);

module.exports = router;
