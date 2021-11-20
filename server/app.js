require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const {zendeskService} = require('./services/zendesk');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/tickets/:id', async (req, res) => {
  const data = await zendeskService().getTicket(req.params.id);

  res.send(data);
});

app.get('/tickets', async (req, res) => {
  const data = await zendeskService().getTicketList(req.query.page);

  res.send(data);
});

app.use(errorHandler);

module.exports = app;
