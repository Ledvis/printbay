const Item = require("../models/item");

module.exports.fetch = async (req, res) => {
  try {
    const items = await Item.find();

    res.send({ items });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.create = async (req, res) => {
  const { title, artist, image, year, price } = req.body;
  const item = new Item({ title, artist, image, year, price });

  try {
    const doc = await item.save();
    res.send({ item: doc });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.read = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).send();

    res.send({ item });
  } catch (error) {
    res.status(500).send(error);
  }
};
