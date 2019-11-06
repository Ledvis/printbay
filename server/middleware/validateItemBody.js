module.exports = function (req, res, next) {
  const body = {};

  ["title", "artist", "year", "price", "image"].forEach(field => {
    if (req.body.hasOwnProperty(field)) body[field] = req.body[field];
  });

  req.body = body;

  next();
};
