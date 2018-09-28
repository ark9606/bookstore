/**
 * Author: Arkady Zelensky
 */

const express = require('express');
const router = express.Router();
const book = require('../controllers/BookController');

/* GET user page. */
router.get('/', book.getBooks);


module.exports = router;
