/**
 * Author: Arkady Zelensky
 */

const Sequelize = require('sequelize');
const db = require('../config/db');
const sequelize = new Sequelize(db.name, db.user, db.password, db.config);
const UserModel = sequelize.import('../models/User');

const AuthController = require('./AuthController');

const { generateHash, isValidPassword } = require('../helpers');

exports.getProfile = (req, res, next) => { 
  const data = {
    title: 'Profile',
    isSigned: AuthController.isUserSigned(req),
    user: req.user
  };

  res.render('user/profile', data);
}


exports.changePassword = (req, res, next) => { 
  const data = {
    status: false,
  };

  const { oldPassword, newPassword } = req.body;

  UserModel.findById(req.user.id)
  .then(user => {

    if(!isValidPassword(user.password, oldPassword)) {
      data.error = 'Old password is incorrect';
      res.send(data);
      return;
    }

    user.password = generateHash(newPassword);
    return user.save();
  }).then(res => {

    data.status = true;
    data.message = 'Password was changed successfully!';
    res.send(data);
  }).catch(err => {

    console.log(err);
    data.error = err;
    res.send(data);
  });

}