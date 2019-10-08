const path = require("path");
const faker = require("faker");
require("dotenv").config({
  path: path.join(__dirname, "./", ".env.server")
});
const User = require("../server/models/user");

const seedUsers = [
  {
    name: faker.name.firstName(),
    email: "admin@test.com",
    password: "123456",
    role: "admin"
  },
  {
    name: faker.name.firstName(),
    email: "user@test.com",
    password: "123456"
  }
];

module.exports.populateUsers = async () => {
  await User.deleteMany();
  // can't use insertMany because pre hooks doesn't work on this method
  await new User(seedUsers[0]).save();
  await new User(seedUsers[1]).save();
};
