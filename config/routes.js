const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const carController = require('../controllers/carController');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/cars', carController);
};
