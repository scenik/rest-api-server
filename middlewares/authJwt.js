require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  
  if(!token) {
    return res.status(403).json({message: "No token provided."});
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err) {
      return res.status(401).json({message: "Unauthorized!"});
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if(err) {
      return res.status(500).json({message: err.message});
    }
    console.log(user);
    if (user.isAdmin) {
      next();
      return;
    }
    return res.status(403).json({message: "You must be an admin to access this functionality."});
  });
};

const authJwt = {
  verifyToken,
  isAdmin
}

module.exports = authJwt;