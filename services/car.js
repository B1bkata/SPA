const Car = require('../models/Car');
const User = require('../models/User');

async function createCar(carData) {
  const car = new Car(carData);

  await car.save();

  return car;
}

async function getAllCars() {
  let sort = { date: 1 };

  const cars = await Car.find({}).sort(sort).lean();

  return cars;
}

async function getCarById(id) {
  const car = await Car.findById(id).populate('buddies').lean();

  return car;
}

async function deleteCar(id) {
  return Car.findByIdAndDelete(id);
}

async function editCar(id, carData) {
  const car = await Car.findById(id);

  car.startPoint = carData.startPoint;
  car.endPoint = carData.endPoint;
  car.date = carData.date;
  car.time = carData.time;
  car.imageUrl = carData.imageUrl;
  car.brand = carData.brand;
  car.seats = carData.seats;
  car.price = carData.price;
  car.description = carData.description;

  return car.save();
}

async function joinTrip(carId, userId) {
  const user = await User.findById(userId);
  const car = await Car.findById(carId);

  //const hotel = await req.storage.getHotelById(req.params.id);

  if (car.creator == user._id) {
    throw new Error('Cannot join your own trip');
  }
  car.buddies.push(userId);
  user.trips.push(carId);

  car.seats--;

  return Promise.all([user.save(), car.save()]);
}

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  deleteCar,
  editCar,
  joinTrip,
};
