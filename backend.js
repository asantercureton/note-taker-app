const express = require('express');
const fs = require('fs');

const PORT = 3001;
// Initialize express app
const app = express();

// Setting up static public with express
app.use(express.static('public'));

// Setting up data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Setup listener
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = backend;