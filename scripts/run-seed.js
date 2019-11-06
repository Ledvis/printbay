const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({
  path: path.join(__dirname, "../", ".env.server")
});
const { populateUsers, populateItems } = require("./seed");

const dbName = process.env.NODE_ENV === "test" ? "printbay_test" : "printbay";

mongoose.connect(`${process.env.MONGO_DB_URI}/${dbName}`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

(async () => {
  try {
    await populateUsers();
    console.log("Successfully seeded user accounts");
    const items = await populateItems();
    console.log(`Successfully seeded ${items.length} items`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
