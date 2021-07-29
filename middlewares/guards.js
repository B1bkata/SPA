function isUser() {
  return (req, res, next) => {
    if (req.user) next();
    else res.redirect('/cars/shared');
  };
}

function isGuest() {
  return (req, res, next) => {
    if (!req.user) next();
    else res.redirect('/');
  };
}

module.exports = {
  isUser,
  isGuest,
};
