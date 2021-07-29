const { Schema, model } = require('mongoose');

const schema = new Schema({
  startPoint: {
    type: String,
    required: [true, 'All fields are required'],
    minLength: [4, 'End Point should be at least 4 characters long'],
  },
  endPoint: {
    type: String,
    required: [true, 'All fields are required'],
    minLength: [4, 'End Point should be at least 4 characters long'],
  },
  date: {
    type: String,
    required: [true, 'All fields are required'],
  },
  time: {
    type: String,
    required: [true, 'All fields are required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'All fields are required'],
    match: [/^http?/, 'Image must be a valid URL'],
  },
  brand: {
    type: String,
    required: [true, 'All fields are required'],
    minLength: [4, 'Car brand should be at least 4 characters long'],
  },
  seats: {
    type: Number,
    required: [true, 'All fields are required'],
    min: 0,
    max: 4,
  },
  price: {
    type: Number,
    required: [true, 'All fields are required'],
    min: [1, 'Price should be a positive number between 1 and 50'],
    max: [50, 'Price should be a positive number between 1 and 50'],
  },
  description: {
    type: String,
    required: [true, 'All fields are required'],
    minLength: [10, 'Car brand should be at least 10 characters long'],
  },
  creator: { type: Schema.Types.ObjectID, ref: 'User' },
  buddies: [{ type: Schema.Types.ObjectID, ref: 'User', default: [] }],
  driver: { type: String },
});

module.exports = model('Car', schema);
