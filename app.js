const express = require('express');
const app = express();
const {
  couplesRouter,
  guestsRouter,
  eventsRouter,
  rsvpsRouter,
} = require('./routers');

// Middleware
app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use('/api/couples', couplesRouter);
app.use('/api/guests', guestsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/rsvps', rsvpsRouter);

module.exports = app;
