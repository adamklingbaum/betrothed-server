const mongoose = require('mongoose');
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
