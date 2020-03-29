require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;

exports.signup = (req, res) => {
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).json({ message: err.message || "Error creating new user account." });
      return; 
    } else {
      jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '6h' }, function(err, token) {
        res.status(200).json({user: user, token: token});
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err.message });
      }
      if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '6h' }, function(err, token) {
            res.status(200).json({user: user, token: token});
          });
        } else {
          res.status(400).json({ message: "Invalid login credentials." });
        }
      } else {
        res.status(400).json({ message: "Invalid login credentials." });
      }
    });
};