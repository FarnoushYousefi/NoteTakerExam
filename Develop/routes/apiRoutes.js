const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const notesFile = require('../db/db.json');

router.get('/api/notes', (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  res.send(notes);
});
router.post('/api/notes', (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  const newNote = req.body;

  //   const newNotes = req.body;
  newNote.id = notesFile.length.toString();
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes)
  );
  res.send('created');
});
router.delete('/api/notes/:id', (req, res) => {
  console.log(
    'readFileSyn',
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  console.log('with Parse', notes);
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(delNote)
  );
  res.send('deleted');
});
module.exports = router;
