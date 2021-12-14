const express = require('express');
const router = require('./routers');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/api', router);

module.exports = app;
