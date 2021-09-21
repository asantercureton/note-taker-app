// Dependencies
const fs = require('fs');
const util = require('util');
const router = require('express').Router();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = router => {

    // GET route for /api/note
    router.get('/api/notes', (req, res) => {
        res.json(noteData);
        console.log('Successful GET!');
    });

    // Retrieve note with id
    router.get('/api/notes/:id', (req, res) => {
        res.json(noteData[req.params.id]);
        console.log('Successful GET for id!');
    });

    // POST route for /api/note
    router.post('/api/notes', (req, res) => {
        let newNote = req.body;
        noteData.push(newNote);
        res.json(noteData);
        console.log('New note: ' + newNote.title + 'successfully added!');
    });

    // Delete note with id
    router.delete('/api/note/:id', (req, res) => {
        const newData = noteData.splice(req.params.id, 1);
        // Write new data to 'db.json' file
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        res.json(newData);
        console.log("Deleted note with id: " + req.params.id);
    });
};