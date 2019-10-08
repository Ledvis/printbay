const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");
const authentication = require("../middleware/auth");
const admin = require("../middleware/admin");

router
  .route("/")
  .get(itemsController.list)
  .all(authentication, admin)
  .post(itemsController.create);

router
  .route("/:id")
  .get(itemsController.read);

module.exports = router;
