const express = require('express');

const { elections } = require('./../controllers/electionsController');
const { protect } = require('./../controllers/authController');

const router = express.Router();

router.get('/myelections', elections);

module.exports = router;
