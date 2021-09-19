const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const jsonDB = require('../db/db.json');
const uuid = require('./helpers/uuid');

const PORT = 3001;
const app = express();

app.use(express.static('public'));
app.use(express.json());

// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
 const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
   err ? console.error(err) : console.info(`\nData written to ${destination}`)
 );

/**
*  Function to read data from a given a file and append some content
*  @param {object} content The content you want to append to the file.
*  @param {string} file The path to the file you want to save to.
*  @returns {void} Nothing
*/
const readAndAppend = (content, file) => {
 fs.readFile(file, 'utf8', (err, data) => {
   if (err) {
     console.error(err);
   } else {
     const parsedData = JSON.parse(data);
     parsedData.push(content);
     writeToFile(file, parsedData);
   }
 });
};

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for saved notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received`);

  const { title, note } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);

module.exports = backend;