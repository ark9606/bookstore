/**
 * Author: Arkady Zelensky
 */

const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize = new Sequelize(db.name, db.user, db.password, db.config);
const UserModel = sequelize.import('../models/User');

const emailConfig = require('../config/email');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(emailConfig.config);

const emailForgot = emailConfig.emails.forgot;

const randomstring = require("randomstring");
const { generateHash } = require('../helpers');

const isUserSigned = (req) => {
  const isAdmin = req.user && 'login' in req.user ? true : false;
  return req.isAuthenticated() && !isAdmin;
}

const isAdminSigned = (req) => {
  const isAdmin = req.user && 'login' in req.user ? true : false;
  return req.isAuthenticated() && isAdmin;
}

exports.getSignup = (req, res, next) => { 
  const data = {
    title: 'Sign Up'
  };
  res.render('auth/signup', data);
}

exports.postSignup = (req, res, next) => {

  const data = {
    status: req.user ? true : false
  };

  if(!req.user) {
    data.error = req.flash('message')[0];
  } else {
    data.data = { redirect: '/user'}
  }  
  
  res.send(data);
}

exports.getSignin = (req, res, next) => { 

  const data = {
    title: 'Sign In'
  };
  res.render('auth/signin', data);
}

exports.postSignin = (req, res, next) => {

  const data = {
    status: req.user ? true : false
  };

  if(!req.user) {
    data.error = req.flash('message')[0];
  } else {
    data.data = { redirect: '/user'}
  }
  
  res.send(data);
}

exports.getSignout = (req, res, next) => { 
  req.logout();
  res.redirect('/');
}

exports.getForgot = (req, res, next) => { 
  const data = {
    title: 'Forgot password'
  };
  res.render('auth/forgot', data);
}

exports.postForgot = (req, res, next) => { 
  const data = {
    status: false
  };

  let token = '';
  const {email} = req.body;


  UserModel.findOne({ where: { email } })
  .then(user => {

    if(!user) {
      data.error = 'User with this email is not registred';
      res.send(data);
      return false;
    }

    token = randomstring.generate(64);

    user.forgot_token = token;
    return user.save();
  })
  .then(user => {
    if(!user) return;

    // console.log(req.headers.origin);
    const { headers:{ origin}} = req;
    const forgotUrl = `${origin}/auth/forgot/change?token=${token}`;
    let message = emailForgot.content;
    message.to = email;
    message.text = emailForgot.getText(forgotUrl);
    message.html = emailForgot.getHtml(forgotUrl);

    transporter.sendMail(message, (err, info) => {
      if (err) {
          console.log('Error occurred. ' + err.message);
          data.message = err.message;
          res.send(data);
          return;
      }

      console.log('Email was sent to ', info.accepted);

      data.status = true;
      data.message = 'Mail was sent';
      res.send(data);
    });
  })
  .catch(err => {

    console.log(err);
    data.error = err;
    res.send(data);
  });
}

exports.getForgotChange = (req, res, next) => { 
  const data = {
    title: 'Change password'
  };
  res.render('auth/forgot_change', data);
}

exports.postForgotChange = (req, res, next) => { 
  const data = {
    status: false
  };

  const {token} = req.query;
  const {newPassword} = req.body;

  UserModel.findOne({ where: { forgot_token: token } })
  .then(user => {

    if(!user) {
      data.error = 'Token is incorrect';
      res.send(data);
      return false;
    }

    user.password = generateHash(newPassword);
    user.forgot_token = '';
    return user.save();
  })
  .then(user => {

    data.status = true;
    data.message = 'Password was successfully changed';
    res.send(data);
  })
  .catch(err => {

    console.log(err);
    data.error = err;
    res.send(data);
  });
}

exports.isSignedIn = function (req, res, next) {
  if (isUserSigned(req))
    return next();
  res.redirect('/auth/signin');
};

exports.isNotSignedIn = function (req, res, next) {
  if (!req.isAuthenticated())
    return next();
  res.redirect('/');
};

exports.isUserSigned = isUserSigned;
exports.isAdminSigned = isAdminSigned;




