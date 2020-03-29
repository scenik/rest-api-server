module.exports = function(app) {
  const { authJwt } = require('../middlewares');
  const controller = require('../controllers/category.controller');

  var router = require('express').Router();

  router.get(
    "/",
    controller.findAll
  );
  router.get(
    "/:id",
    controller.findOne
  );
  router.post(
    "/",
    controller.create
  );
  router.put(
    "/:id",
    controller.update
  );
  router.delete(
    "/:id",
    controller.delete
  );

  app.use("/categories", router);
};