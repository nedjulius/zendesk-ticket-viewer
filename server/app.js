require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const ticketsRoutes = require('./routes/tickets');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/tickets', ticketsRoutes);
app.use(errorHandler);

module.exports = app;
