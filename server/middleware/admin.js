module.exports = async function (req, res, next) {
  if (req.body.user && req.body.user.role === "admin") {
    next();
  } else {
    return res.status(403).send({
      message: "Only admin users can take this action."
    });
  }
};
