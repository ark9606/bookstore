/**
 * Author: Arkady Zelensky
 */

const LocalStrategy = require('passport-local').Strategy;
const { generateHash, isValidPassword } = require('../helpers');

const Sequelize = require('sequelize');

const db = require('../config/db');
const sequelize = new Sequelize(db.name, db.user, db.password, db.config);
const AdminModel = sequelize.import('../models/Admin');

module.exports = function (passport, User) {
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      const hashPassword = generateHash(password);

      User.findOrCreate({
        defaults: {
          first_name: req.body.first_name,
          password: hashPassword,
        },
        where : { email: email }
      }).spread((newUser, created)=>{

        // user with this email is already exist
        if(!created){
          return done(null, false, req.flash('message', 'User with this email already registered'));
        }

        return done(null, newUser);        
      }).catch(e => {
        return done(e, false, req.flash('message', 'Something went wrong'));
      });
    }

  ));


  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {

      User.findOne({
        where: {
          email: email
        }
      }).then(function(user) {

        if (!user) {
          return done(null, false, req.flash('message', 'User with this email not registered'));
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, req.flash('message', 'Password is incorrect'));
        }

        const userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Login Error:", err);
        return done(null, false, req.flash('message', 'Something went wrong'));
      });
    }
  ));


  passport.use('local-admin-signin', new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function(req, login, password, done) {

      AdminModel.findOne({
        where: {
          login
        }
      }).then(function(admin) {

        if (!admin) {
          return done(null, false, req.flash('message', 'Admin with this login is not registered'));
        }

        if (!isValidPassword(admin.password, password)) {
          return done(null, false, req.flash('message', 'Password is incorrect'));
        }

        const adminInfo = admin.get();
        return done(null, adminInfo);
      }).catch(function(err) {
        console.log("Login Error:", err);
        return done(null, false, req.flash('message', 'Something went wrong'));
      });
    }
  ));



  //serialize
  passport.serializeUser(function(user, done) {
    const data = {
      type: 'login' in user ? 'admin' : 'user',
      id: user.id
    }
    done(null, data);
  });

  // deserialize user
  passport.deserializeUser(function(data, done) {

    if(data.type === 'user')  {
      User.findById(data.id).then(function(user) {
        if (user) {
          done(null, user.get());
        } else {
          done(user.errors, null);
        }
      });
      return;
    }

    AdminModel.findById(data.id).then(function(admin) {
      if (admin) {
        done(null, admin.get());
      } else {
        done(admin.errors, null);
      }
    });


  });
};