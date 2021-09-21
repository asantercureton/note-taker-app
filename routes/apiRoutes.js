// Dependencies
const storage = require('../db/storage');
const router = require('express').Router();

// GET route for /api/note
router.get('/api/notes', (req, res) => {
    storage.getFile().then(notes => res.text(notes));
});

// POST route for /api/note
router.post('/api/notes', (req, res) => {
    storage.saveFile(req.body).then((note) => res.text(note));
});

// Delete note with id
router.delete('/api/note/:id', (req, res) => {
    storage.deleteFile(req.params.id).then(() => res.text({ ok: true }));
});

module.exports = router;
