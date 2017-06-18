const express = require('express');
const router = express.Router();
const storeContrller = require('../controllers/storeController');


// Do work here
router.get('/', storeContrller.homePage);
 

module.exports = router;

