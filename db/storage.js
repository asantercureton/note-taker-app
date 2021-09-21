// Worked with tutor, Spencer Creer

const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    constructor() {
        this.lastId = 0;
    }

    // Read db.json file
    readFile() {
        return readFileAsync('./db/db.json', "UTF8");
    }

    // Write to db.json file
    writeFile(note) {
        return writeFileAsync('./db/db.json', JSON.stringify(note));
    }

    // Get notes within db.json file
    getNote() {
        return this.readFile().then(note => {
            let parseNotes = [];

            parseNotes = [].concat(JSON.parse(note));

            return parseNotes;
        });
    }

    // Save note within db.json file
    saveFile() {
        return this.readFile().then(notes => {
            const newNote = {
                title: notes.title,
                text: notes.text,
                id: ++this.lastId
            };

            return this.writeFile([notes, newNote]);
        });
    }

    // Delete note within db.json file
    deleteNote() {
        return this.getNote()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(filteredNotes => this.writeFile(filteredNotes));
        
    }
};

module.exports = new Storage;