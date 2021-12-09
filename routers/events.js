const express = require('express');
const router = express.Router();
const { event } = require('../models');

router.get('/', (req, res) => {
  res.status(200).send('hello from /api/events');
});

module.exports = router;
