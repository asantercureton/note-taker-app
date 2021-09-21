// Dependencies
const storage = require('../db/storage');
const router = require('express').Router();

// GET route for /api/note
router.get('/notes', (req, res) => {
    storage.getFile().then(notes => res.json(notes));
});

// POST route for /api/note
router.post('/notes', (req, res) => {
    storage.saveFile(req.body).then((note) => res.json(note));
});

// Delete note with id
router.delete('/note/:id', (req, res) => {
    storage.deleteFile(req.params.id).then(() => res.json({ ok: true }));
});

module.exports = router;
