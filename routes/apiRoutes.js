const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const notes = require('../db/db.json');
const notesSaved = notes && notes.length ? notes : [];

// GET ALL NOTES
router.get('/notes', (req, res) => {
  res.json(notesSaved);
})

// SAVE NOTES
router.post('/notes', (req, res) => {  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        id: uuid(),
        title,
        text,
      };
  
      notesSaved.push(newNote);
  
      const storedNote = JSON.stringify(notesSaved, null, 2);
  
      fs.writeFile('./db/db.json', storedNote, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Note for ${newNote.title} has been written to JSON file`
            )
      );
  
      const response = {
        status: 'Successful',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error with saving note');
    }
  });

  router.delete('/notes/:id', (req, res) => {
    notesSaved.splice(req.params.id, 1);
    const storedNote = JSON.stringify(notesSaved, null, 2)
    
    fs.writeFile('./db/db.json', storedNote, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Note has been deleted from JSON file`
            ));

    return res.json(notesSaved);
  })

  module.exports = router;