const Item = require("../models/item");

module.exports.list = (req, res) => {
  res.send({ message: "It works!" });
};

module.exports.create = async (req, res) => {
  const item = new Item(req.body);

  try {
    const doc = await item.save();
    res.send({ item: doc });
  } catch (error) {
    res.status(400).send(error);
  }
};
