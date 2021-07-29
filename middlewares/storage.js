const car = require('../services/car');

module.exports = () => (req, res, next) => {
  req.storage = { ...car };
  next();
};
