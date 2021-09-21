// Dependencies
const express = require('express');
const apiRoute = require('./routes/apiRoutes');
const htmlRoute = require('./routes/htmlRoute');

// Initialize express app
const app = express();
// Set up Port
const PORT = process.env.PORT || 3001;


// Setting up static public with express
app.use(express.static('public'));

// Setting up Express for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoute);
app.use('/', htmlRoute);


// Setup listener
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);
