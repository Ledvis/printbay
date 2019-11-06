const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/items");
const authenticate = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateItemBody = require("../middleware/validateItemBody");
const validateIdItemParam = require("../middleware/validateIdItemParam");

router
  .route("/")
  .get(ItemController.fetch)
  .all(authenticate, admin)
  .all(validateItemBody)
  .post(ItemController.create);

router
  .route("/:id")
  .all(validateIdItemParam)
  .get(ItemController.read)
  .all(authenticate, admin);

module.exports = router;
