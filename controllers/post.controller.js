const db = require('../models');
const Post = db.post;

exports.create = (req, res) => {
  if(!req.body.title || !req.body.description || !req.body.content) {
    return res.status(400).json({ message: "Please be sure to fill in all required fields." });
  }

  let post = new Post({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content
  });

  post
    .save(post)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({message: err.message || "Some error occured while creating new post" });
    });
};

exports.findAll = (req, res) => {
  const title =   req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
  Post.find(condition)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "There was a problem finding a post with that condition" });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "No post found with id "+id });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error finding post id "+id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Data body cannot be empty!" });
  }

  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "Cannot update post with id "+id });
      } else {
        res.status(200).json({ message: "Post was updated succesfully." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating post with id "+id });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).json({ message: "Could not find and remove post with id "+id });
      } else {
        res.status(200).json({ message: "Post was removed succesfully" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not remove post with id "+id });
    });
};

exports.deleteAll = (req, res) => {
  Post.deleteMany({})
    .then(data => {
      res.status(200).json({ message: `${data.deletedCount} posts were deleted succesfully` });
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "There was a problem removing posts" });
    });
};

exports.findAllPublished = (req, res) => {
  Post.find({ published: true })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: err.message || "There was a problem finding published post" });
    });
};