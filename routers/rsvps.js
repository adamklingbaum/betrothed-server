const express = require('express');
const router = express.Router();
const { rsvp } = require('../models');

router.get('/', (req, res) => {
  res.status(200).send('hello from /api/rsvps');
});

module.exports = router;
