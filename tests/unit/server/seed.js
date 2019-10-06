const path = require("path");
const faker = require("faker");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: path.join(__dirname, "../../../", ".env.server")
});
const { ObjectId } = require("mongodb");
const Item = require("../../../server/models/item");
const User = require("../../../server/models/user");

const seedItems = [
  { _id: new ObjectId(), title: "title #1" },
  { _id: new ObjectId(), title: "title #2" }
];

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const seedUsers = [
  {
    _id: userOneId,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  },
  {
    _id: userTwoId,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
];

const populateItems = async () => {
  await Item.deleteMany();
  await Item.insertMany(seedItems);
};

const populateUsers = async () => {
  await User.deleteMany();
  // can't use insertMany because pre hooks doesn't work on this method
  await new User(seedUsers[0]).save();
  await new User(seedUsers[1]).save();
};

module.exports = {
  seedItems,
  populateItems,
  seedUsers,
  populateUsers
};
