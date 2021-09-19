const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const jsonDB = require('../db/db.json');
const uuid = require('./helpers/uuid');

const PORT = 3001;
const app = express();

app.use(express.static('public'));

// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

const readFromFile = util.promisify(fs.readFile);

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  return res.json(jsonDB);
  console.info(`${req.method} request received`);
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received`);

  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
});

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = backend;