// Dependencies
const express = require('express');
const apiRoute = require('./routes/apiRoutes');
const htmlRoute = require('./routes/htmlRoutes');

// Set up Port
const PORT = 3001;

// Initialize express app
const app = express();

// Setting up static public with express
app.use(express.static('public'));

// Setting up Express for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Setup listener
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = backend;