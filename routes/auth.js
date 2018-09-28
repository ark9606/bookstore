/**
 * Author: Arkady Zelensky
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const routeController = require('../controllers/AuthController');

/* GET SignUp page. */
router.get('/signup', routeController.getSignup);

router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) { return next(err); }

    if (!user) { 
      const error = req.flash('message')[0];
      return res.json({status: false, error}); 
    }

    req.login(user, (err) => {
      if (err) { return next(err); }
      return next();
    });
  })(req, res, next)

}, routeController.postSignup);

/* GET SignIn page. */
router.get('/signin', routeController.getSignin);

router.post('/signin', (req, res, next) => {
  passport.authenticate('local-signin', (err, user, info) => passportHandler(err, user, info, req, res, next))(req, res, next)
}, routeController.postSignin);

// GET Sign out
router.get('/signout', routeController.getSignout);

/* GET Forgot password page to enter EMAIL */
router.get('/forgot', routeController.getForgot);

router.post('/forgot', routeController.postForgot);

// GET Forgot page to change password
router.get('/forgot/change', routeController.getForgotChange);

// POST change forgotten password
router.post('/forgot/change', routeController.postForgotChange);

function passportHandler(err, user, info, req, res, next) {
  if (err) { return next(err); }

  if (!user) { 
    const error = req.flash('message')[0];
    return res.json({status: false, error}); 
  }

  req.login(user, (err) => {
    if (err) { return next(err); }
    return next();
  });
}

module.exports = router;
