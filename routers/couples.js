const express = require('express');
const router = express.Router();
const { couple } = require('../models');

router.get('/', (req, res) => {
  res.status(200).send('hello from /api/couples');
});

module.exports = router;
