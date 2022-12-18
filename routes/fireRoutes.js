const express = require('express');
const { fireCalulator } = require('../controllers/fireController');

const router = express.Router();

router.post('/calculator', fireCalulator);

module.exports = router;
