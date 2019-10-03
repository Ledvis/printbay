const { ObjectId } = require("mongodb");
const Item = require("../../../server/models/item");
const seedItems = [
  { title: "title #1", _id: new ObjectId() },
  { title: "title #2", _id: new ObjectId() }
];
const populateItems = async () => {
  await Item.deleteMany();
  await Item.insertMany(seedItems);
};

module.exports = ({
  seedItems,
  populateItems
});
