const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3002;
const api = require("./routes/index.js");

const uuid = require("./helpers/uuid");

const noteDB = require("./db/db.json");

app.use(express.static("public"));
fs.writeFileSync("./db/db.json", JSON.stringify(noteDB));

app.get("/", (req, res) => res.sendFile("/public/index.html"));

// .save-note
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.get("/api/notes", (req, res) => res.json(noteDB));

app.put("/api/notes", (req, res) => res.json(noteDB));

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid();
  noteDB.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteDB));
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  const noteID = noteDB.findIndex((note) => note.id === id);

  if (noteID !== -1) {
    noteDB.splice(noteID, 1);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteDB));
  } else {
    res.status(404);
  }
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
