const User = require('../models/User');

async function createUser(email, hashedPassword, gender) {
  const user = new User({ email, hashedPassword, gender });

  await user.save();

  return user;
}

async function getUserByEmail(email) {
  const pattern = new RegExp(`^${email}$`, 'i');
  const user = await User.findOne({
    email: { $regex: pattern },
  });

  return user;
}

async function getUserById(id) {
  const user = await User.findOneById(id);

  return user;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
