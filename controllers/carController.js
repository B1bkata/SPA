const router = require('express').Router();
const { parseError } = require('../util/parser');
const User = require('../models/User');

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
  res.render('car/create');
});

router.post('/create', isUser(), async (req, res) => {
  const carData = {
    startPoint: req.body.startPoint,
    endPoint: req.body.endPoint,
    date: req.body.date,
    time: req.body.time,
    imageUrl: req.body.imageUrl,
    brand: req.body.brand,
    seats: req.body.seats,
    price: req.body.price,
    description: req.body.description,
    creator: req.user._id,
    buddies: req.body.buddies,
    driver: req.user.email,
  };

  try {
    await req.storage.createCar(carData);
    res.redirect('/cars/shared');
  } catch (err) {
    const ctx = {
      errors: parseError(err),
      carData: {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
      },
    };
    res.render('car/create', ctx);
  }
});

router.get('/details/:id', isUser(), async (req, res) => {
  try {
    const car = await req.storage.getCarById(req.params.id);
    car.hasUser = Boolean(req.user);
    car.hasSeats = car.seats > 0;
    car.isAuthor = req.user && req.user._id == car.creator;
    car.joined = req.user && car.buddies.find((u) => u._id == req.user._id);
    res.render('car/details', { car });
  } catch (err) {
    console.log(err);
    res.render('home/404');
  }
});

router.get('/edit/:id', isUser(), async (req, res) => {
  try {
    const car = await req.storage.getCarById(req.params.id);
    if (car.creator != req.user._id) {
      throw new Error('Cannot edit a car you have not created');
    }

    res.render('car/edit', { car: car });
  } catch (err) {
    res.redirect('/car/details/' + req.params.id);
  }
});

router.post('/edit/:id', isUser(), async (req, res) => {
  try {
    const car = await req.storage.getCarById(req.params.id);
    if (car.creator != req.user._id) {
      throw new Error('Cannot edit a car you have not created');
    }

    await req.storage.editCar(req.params.id, req.body);
    res.redirect('/cars/details/' + req.params.id);
  } catch (err) {
    const ctx = {
      errors: parseError(err),
      car: {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
      },
    };
    res.render('car/details', ctx);
  }
});

router.get('/delete/:id', isUser(), async (req, res) => {
  try {
    const car = await req.storage.getCarById(req.params.id);

    if (car.creator != req.user._id) {
      throw new Error('Cannot delete a car you have not created');
    }
    await req.storage.deleteCar(req.params.id);
    res.render('home/shared');
  } catch (err) {
    res.redirect('/car/details/' + req.params.id);
  }
});

router.get('/join/:id', isUser(), async (req, res) => {
  try {
    await req.storage.joinTrip(req.params.id, req.user._id);
    res.redirect('/cars/details/' + req.params.id);
  } catch (err) {
    res.redirect('/cars/details/' + req.params.id);
  }
});

router.get('/profile', isUser(), async (req, res) => {
  const trips = req.user;
  console.log(trips);
  req.user.isMale = req.user.gender == 'male';

  res.render('user/profile');
});
module.exports = router;
