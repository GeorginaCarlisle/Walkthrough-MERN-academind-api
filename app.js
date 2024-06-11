require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const url = process.env.URL;

const app = express();

app.use(bodyParser.json());
// Above finds json data with the http request body and converts to JS before moving onto the next middleware

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } // Makes sure no response has been sent as only one response is allowed
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

/**
 * First: Try to connect to the database
 * If the connection is successful, then start the server
 * There is no point starting the server if the connection to the database has failed,
 * as this is the whole reason for the server, it is nothing without the database.
 * If the connection fails an error is then logged to the console, so that we can see what is going on
 */
mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err)
  });

