module.exports = function(app) {
  const controller = require('../controllers/post.controller');
  
  var router = require('express').Router();

  router.post('/', controller.create);
  router.get('/', controller.findAll);
  router.get('/published', controller.findAllPublished);
  router.get('/:id', controller.findOne);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);
  router.delete('/', controller.deleteAll);

  app.use('/posts', router);
}