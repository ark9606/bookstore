/**
 * Author: Arkady Zelensky
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const favicon = require('serve-favicon');

// import User Model
const Sequelize = require('sequelize');
const db = require('./config/db');
const sequelize = new Sequelize(db.name, db.user, db.password, db.config);
const UserModel = sequelize.import('./models/User');

const passport = require('passport');
const session = require('express-session');

const passportStrategies = require('./config/passport.js');
const flash = require('connect-flash');

// load passport strategies
passportStrategies(passport, UserModel);

const routes = require('./routes/constants');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');
const adminRouter = require('./routes/admin');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/** For passport */
app.use(session({
  secret: 'bookstore_secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session()); // постоянные сессии входа (persistent login sessions)

// for passport flash ( send message of login/register fail )
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes.index, indexRouter);
app.use(routes.auth, authRouter);
app.use(routes.user, userRouter);
app.use(routes.books, booksRouter);
app.use(routes.admin, adminRouter);

 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
