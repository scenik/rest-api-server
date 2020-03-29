const db = require('../models');
const Category = db.category;

exports.create = (req, res) => {
  if(!req.body.name) {
    return res.status(400).json({ message: "Please be sure to fill in all required fields." });
  }

  let category = new Category({
    name: req.body.name,
    description: req.body.description
  });

  category
    .save(category)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({message: err.message || "An error occurred while creating new category." });
    });
};

exports.findAll = (req, res) => {
  Category.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({message: err.message || "Error retrieving categories"});
    });
};

exports.delete = (req, res) => {
  let id = req.params.id;
  Category.findByIdAndRemove(id)
    .then(data => {
      if(!data) {
        return res.status(404).json({message: `Could not find category with id ${id} to remove.`});
      } else {
        return res.status(200).json({message: `Category with id ${id} was succesfully removed.`});
      }
    })
    .catch(err => {
      return res.status(500).json({message: `There was an error removing category with id ${id}`});
    });
};

exports.findOne = (req, res) => {
  let id = req.params.id;

  Category.findById(id)
    .then(data => { 
      if(!data) {
        return res.status(404).json({message: `No category with id ${id} found.`});
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(err => {
      return res.status(500).json({message: `Error finding category with id ${id}`});
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Data body cannot be empty!" });
  }

  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).json({ message:`Cannot update category with id ${id}` });
      } else {
        res.status(200).json({ message: "Category was updated succesfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Error updating category with id ${id}` });
    });
};