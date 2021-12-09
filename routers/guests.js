const express = require('express');
const router = express.Router();
const { guest } = require('../models');

router.get('/', (req, res) => {
  res.status(200).send('hello from /api/guests');
});

module.exports = router;
