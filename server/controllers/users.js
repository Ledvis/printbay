const User = require("../models/user");

module.exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    const doc = await user.save();
    const token = await doc.generateAuthToken();

    res.header("authorization", `Bearer ${token}`).send({ user: doc });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.read = async (req, res) => {
  res.send({ user: req.body.user });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doc = await User.findByCredentials(email, password);
    const token = await doc.generateAuthToken();

    res.header("authorization", `Bearer ${token}`).send({ user: doc });
  } catch (error) {
    res.status(400).send(error);
  }
};
