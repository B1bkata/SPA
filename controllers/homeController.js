const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('home/home');
});

router.get('/cars/shared', async (req, res) => {
  const cars = await req.storage.getAllCars();
  res.render('home/shared', { cars });
});
module.exports = router;
