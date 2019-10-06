const User = require("../models/user");

module.exports = async (req, res, next) => {
  let token;

  try {
    token = req.headers.authorization.split(" ")[1];
  } catch (error) {
    return res.status(401).send({ message: "Authorization token invalid" });
  }

  try {
    req.body.user = await User.findByToken(token);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
