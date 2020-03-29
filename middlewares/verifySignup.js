const db = require('../models');
const User = db.user;

isUsernameTaken = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if(err) {
      res.status(500).json({message: err.message});
      return;
    }
    if(user) {
      res.status(400).json({message: "That username is already in use please try another."});
      return;
    }
    next();
  });
}

const verifySignup = {
  isUsernameTaken
}

module.exports = verifySignup;