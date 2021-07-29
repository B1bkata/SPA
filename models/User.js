const { Schema, model } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  gender: { type: String, required: true },
  trips: [{ type: Schema.Types.ObjectID, ref: 'Car', default: [] }],
});

module.exports = model('User', schema);
