const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const selectErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const enableCors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(enableCors);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(selectErrors);

app.listen(PORT, () => {
  console.log(`start server at port ${PORT}`);
});
