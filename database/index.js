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

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));
