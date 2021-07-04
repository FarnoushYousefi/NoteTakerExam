const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const notesFile = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  res.json(notes);
});

router.post('/api/notes', (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../db/db.json'))
  );
  const newNote = req.body;

  //   const newNotes = req.body;
  newNote.id = uuidv4(); //use random id generator to create random id
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes)
  );
  res.send('created');
});

router.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id);
  // console.log(
  //   'readFileSyn',
  //   fs.readFileSync(path.join(__dirname, '../db/db.json'))
  // );
  // const notes = JSON.parse(
  //   fs.readFileSync(path.join(__dirname, '../db/db.json'))
  // );
  // console.log('with Parse', notes);
  // const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);

  return fs.readFile(
    path.join(__dirname, '../db/db.json'),
    'utf8',
    (err, data) => {
      console.log('inside the read', data);
      if (err) throw err;
      const allNotes = JSON.parse(data);
      const delNote = allNotes.filter(
        (rmvNote) => rmvNote.id !== req.params.id
      );
      console.log('********', delNote);

      fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(delNote)
      );
      res.json(delNote);
    }
  );
});

module.exports = router;
