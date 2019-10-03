const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");

router
  .route("/")
  .get(itemsController.list)
  .post(itemsController.create);

router
  .route("/:id")
  .get(itemsController.read);

module.exports = router;
