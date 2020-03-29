module.exports = function(app) {
  const { verifySignup } = require('../middlewares');
  const controller = require('../controllers/auth.controller');

  var router = require('express').Router();

  router.post(
    "/signup",
    [verifySignup.isUsernameTaken], 
    controller.signup
  );

  router.post(
    "/signin", 
    controller.signin
  );

  app.use('/auth', router);
}