const express = require("express")
const index = require("./public/assets/js/index")
const notes = require('./public/notes.html');
const path = require("path")
const PORT = 3001;
const app = express();
const db = require("./db/db.json")

app.listen(PORT, () =>
  console.log(`listening to ${PORT}`)
);

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
res.sendFile(path.join(dirname, '/public/notes.html'))
  });