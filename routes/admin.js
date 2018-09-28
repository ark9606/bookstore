/**
 * Author: Arkady Zelensky
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const admin = require('../controllers/AdminController');

// Get Main Admin page
router.get('/', admin.isSignedIn, admin.getAdminPage);

// Process genres
router.get('/genres', admin.isSignedIn, admin.getGenres);
router.post('/genres/add', admin.isSignedIn, admin.addGenre);
router.post('/genres/delete', admin.isSignedIn, admin.deleteGenre);
router.post('/genres/edit', admin.isSignedIn, admin.editGenre);

// Process authors
router.get('/authors', admin.isSignedIn, admin.getAuthors);
router.post('/authors/add', admin.isSignedIn, admin.addAuthor);
router.post('/authors/delete', admin.isSignedIn, admin.deleteAuthor);
router.post('/authors/edit', admin.isSignedIn, admin.editAuthor);

// Process books
router.get('/books', admin.isSignedIn, admin.getBooks);
router.post('/books/delete', admin.isSignedIn, admin.deleteBook);
router.post('/books/edit', admin.isSignedIn, admin.editBook);
router.post('/books/add', admin.isSignedIn, admin.addBook);

// GET auth page
router.get('/auth', admin.getSigninPage);

// GET logout page
router.get('/auth/signout', admin.isSignedIn, admin.getSignout);

// POST auth
router.post('/auth', (req, res, next) => {
  passport.authenticate('local-admin-signin', (err, user, info) => passportHandler(err, user, info, req, res, next))(req, res, next)
}, admin.postSignin);

const passportHandler = (err, user, info, req, res, next) => {
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
