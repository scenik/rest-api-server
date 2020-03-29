require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;

exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({message: err.message || "Error retrieving userlist"});
    });
};

exports.delete = (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(id)
    .then(data => {
      if(!data) {
        return res.status(404).json({message: `Could not find user with id ${id} to remove.`});
      } else {
        return res.status(200).json({message: `User with id ${id} was succesfully removed.`});
      }
    })
    .catch(err => {
      return res.status(500).json({message: `There was an error removing user with id ${id}`});
    });
};

exports.findOne = (req, res) => {
  let id = req.params.id;

  User.findById(id)
    .then(data => { 
      if(!data) {
        return res.status(404).json({message: `No user with id ${id} found.`});
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(err => {
      return res.status(500).json({message: `Error finding user with id ${id}`});
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Data body cannot be empty!" });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "Cannot update user with id "+id });
      } else {
        res.status(200).json({ message: "User was updated succesfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating user with id "+id });
    });
};