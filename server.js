const uniqid = require("uniqid")
const express = require("express")
const path = require("path")
const PORT = 3001;
const app = express();


app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
  console.info(`${req.method} request received to index.html`);
  res.json(`${req.method} request received to get reviews`);
}
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    ////////CODE BELOW GOOD, WE LIKEY DIS HELPY
    console.info(`${req.method} request received to notes.html`);

    res.json(`${req.method} request received to get reviews`);
}
);

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__filename, 'db.json'))
    console.info(`${req.method} request received to get files from db.json`);
    res.json(`${req.method} request received to get reviews`);
}
);

app.post('/api/notes', (req, res) => {
    res.sendFile(path.join(__filename, 'db.json'))
    console.info(`${req.method} request received to POST to db.json`);
}
);

app.listen(PORT, () =>
  console.log(`listening to ${PORT}`)
);