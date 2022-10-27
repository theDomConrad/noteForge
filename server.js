const uniqid = require("uniqid")
const express = require("express")
const fs = require("fs")
const path = require('path')
let noteDB = require("./db/db.json")
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
}
);



app.get('/api/notes', (req, res) => {
    res.json(noteDB);

    console.info(`${req.method} am i working??`)

    
}
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add NOTE!!!`);
    const { title, text } = req.body;
    if (title && text) {
        const freshNote = {
            title,
            text,
            id: uniqid(),
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const choppedNotes = JSON.parse(data);
                choppedNotes.push(freshNote);
                noteDB = choppedNotes;
                fs.writeFile('./db/db.json', JSON.stringify(choppedNotes, null, 3),
                    (chuckErr) =>
                        chuckErr
                            ? console.error(chuckErr)
                            : console.info('we so good omg becky')
                );
            }
        }
        );
        res.redirect("back");
    }
});

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to add NOTE!!!`);
    
    let idFinder = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const choppedNotes = JSON.parse(data);

            for (x = 0; x<choppedNotes.length; x++) {
                if (idFinder === choppedNotes[x].id){
                    choppedNotes.splice(x, 1)
                }
            }
            noteDB = choppedNotes;
            fs.writeFile('./db/db.json', JSON.stringify(choppedNotes, null, 3),
                (chuckErr) =>
                    chuckErr
                        ? console.error(chuckErr)
                        : console.info('we so good omg becky')
            );
        }
    }
    ); res.redirect("back");
})  

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}
);

app.listen(PORT, () =>
    console.log(`listening to ${PORT}`)
);