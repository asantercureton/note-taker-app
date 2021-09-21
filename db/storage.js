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
    getFile() {
        return this.readFile().then(notes => {
            let parseNotes = [];

            parseNotes = [].concat(json.parse(notes));

            return parseNotes;
        });
    }

    // Save note within db.json file
    saveFile() {
        return this.readFile().then(notes => {
            const newNote = {
                title,
                text,
                id: ++this.lastId
            };

            return this.getFile()
                .then(notes => [...notes, newNote])
                .then(() => newNote);
        });
    }

    // Delete note within db.json file
    deleteFile() {
        return this.getFile()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(filteredNotes => this.writeFile(filteredNotes));
        
    }
};

module.exports = new Storage;