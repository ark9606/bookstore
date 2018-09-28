/**
 * Author: Arkady Zelensky
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const user = require('../controllers/UserController');

/* GET user page. */
router.get('/', authController.isSignedIn, user.getProfile);

/* Change password */
router.post('/password/change', authController.isSignedIn, user.changePassword);

module.exports = router;
