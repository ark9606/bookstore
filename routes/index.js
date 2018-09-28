/**
 * Author: Arkady Zelensky
 */

const express = require('express');
const router = express.Router();
const routeController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', routeController.getIndex);

module.exports = router;
