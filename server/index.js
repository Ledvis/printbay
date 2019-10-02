const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});
const port = process.env.PORT;
const router = require("./routes/items");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/printbay", {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use(bodyParser.json());
app.use("/items", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
