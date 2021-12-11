/* eslint-disable no-console */
const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const { mongoURI } = require('../config/private.config');

try {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Mongoose is connected')
  );
} catch (e) {
  console.log('Could not connect');
}

const db = mongoose.connection;
db.on('error', (err) => console.log(`Connection error ${err}`));
db.once('open', () => console.log('Connected to DB!'));

module.exports = db;
