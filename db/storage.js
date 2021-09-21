const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    // Read db.json file
    readFile() {
        return readFileAsync('./db/db.json', "UTF8");
    }
    // Write to db.json file
    writeFile() {
        return writeFileAsync('./db/db.json', JSON.stringify(note));
    }
    // Get notes within db.json file
    getFile() {
        return this.readFile().then((notes) => {
            let parseNotes = [];

            parseNotes = [].concat(json.parse(notes));

            return parseNotes;
        })
    }
    // Save note within db.json file
    saveFile() {
        return this.readFile().then((notes) => {
            let parseNotes = [];

            parseNotes = [].concat(json.parse(notes));

            return parseNotes;
        })
    }
    // Delete note within db.json file
    deleteFile() {
        return this.readFile().then((notes) => {
            let parseNotes = [];

            parseNotes = [].concat(json.parse(notes));

            return parseNotes;
        })
    }
};

module.exports = Storage;