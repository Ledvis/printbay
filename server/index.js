const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});
const port = process.env.PORT;
const router = require("./routes/items");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/printbay", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const Item = mongoose.model("Item", {
  title: {
    type: String
  },
  artist: {
    type: String
  },
  image: {
    type: String
  },
  year: {
    type: Number
  },
  price: {
    type: Number
  }
});

const item = new Item({
  title: "creation of the world"
});

(async () => {
  try {
    await item.save();
  } catch (error) {
    console.log(error);
  }
})();

app.use("/items", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
