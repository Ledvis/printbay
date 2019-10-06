const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../", ".env.server")
});
const port = process.env.PORT;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbName = process.env.NODE_ENV === "test" ? "printbay_test" : "printbay";

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use(bodyParser.json());
app.use("/items", require("./routes/items"));
app.use("/users", require("./routes/users"));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;
