const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const authenticate = require("../middleware/auth");

router
  .route("/")
  .post(userController.create)
  .all(authenticate)
  .get(userController.read);

router
  .route("/login")
  .post(userController.login);

module.exports = router;
