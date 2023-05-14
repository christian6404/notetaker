const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  console.log(req.body);

  if (req.body) {
    const { title, text, id } = req.body
      const newNote = {
          title,
          text,
          id: uuid()
      };

    readAndAppend(newNote, './db/db.json');
    res.json(`note added`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;