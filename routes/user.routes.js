module.exports = function(app) {
  const { authJwt } = require('../middlewares');
  const controller = require('../controllers/user.controller');

  var router = require('express').Router();

  router.get(
    "/",
    controller.findAll
  );

  router.put(
    "/:id",
    controller.update
  );

  router.get(
    "/:id",
    controller.findOne
  );

  router.delete(
    "/:id",
    controller.delete
  );

  app.use('/users', router);
}