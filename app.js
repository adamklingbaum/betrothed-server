const express = require('express');
const cors = require('cors');
const router = require('./routers');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());
app.use('/api', router);

module.exports = app;
