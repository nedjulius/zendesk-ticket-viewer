const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello! Zendesk coding challenge!');
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const close = () => server.close();

module.exports = {close};
