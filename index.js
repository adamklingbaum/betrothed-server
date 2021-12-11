const app = require('./app');

const db = require('./database');

const { Event, Guest } = require('./models');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
