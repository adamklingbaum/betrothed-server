/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;

try {
  mongoose.connect(
    MONGO_URI,
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
