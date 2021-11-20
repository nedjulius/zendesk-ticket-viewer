const app = require('./app');
const {PORT} = require('./constants/app');

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const close = () => server.close();

module.exports = {close};
