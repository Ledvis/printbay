const Item = require("../models/item");
const { ObjectId } = require("mongodb");

module.exports.list = async (req, res) => {
  try {
    const items = await Item.find();

    res.send({ items });
  } catch (error) {
    res.status(500).send(error);
  }
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

module.exports.read = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(404).send();

  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).send();

    res.send({ item });
  } catch (error) {
    res.status(500).send(error);
  }
};
