const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: 'Email and password are required'});
  }

  User.findOne({email: email}, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use'});
    }

    const user = new User({email, password});
    user.save((err) => {
      if (err) { return next(err); }
      res.json({ token: tokenForUser(user)});
    });
  });
}

exports.signin = function(req, res, next) {
  // Email an password are validate by local passport strategy!!
  // Passport has added the user to the request (see: done(null,user);

  // Just return a token
  res.json({ token: tokenForUser(req.user)});
}


