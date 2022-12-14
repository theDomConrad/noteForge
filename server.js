const uniqid = require("uniqid") //id for notes
const express = require("express")
const fs = require("fs")
const path = require('path')
let noteDB = require("./db/db.json")
const PORT = process.env.PORT || 3001; //port so heroku works
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
}
);

//routes to note db
app.get('/api/notes', (req, res) => {
    res.json(noteDB);
    console.info(`${req.method} routing to note database`)
}
);

app.post('/api/notes', (req, res) => { //function for saving user notes
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
    console.info(`${req.method} request received to DELETE NOTE!!!`); //making sure we are getting in here

    let idFinder = req.params.id; //variable set to determine id of clicked note
    fs.readFile('./db/db.json', 'utf8', (err, data) => { //reading our db.json so we may parse it for desired note
        if (err) {
            console.error(err); //if there is no error we do the work
        } else {
            const choppedNotes = JSON.parse(data);
            for (x = 0; x < choppedNotes.length; x++) { //for loop which determines if selected note matches the ID
                if (idFinder === choppedNotes[x].id) {
                    choppedNotes.splice(x, 1)
                }
            }
            noteDB = choppedNotes;
            fs.writeFile('./db/db.json', JSON.stringify(choppedNotes, null, 3), //writing the array back into our database after the deletion has been made
                (chuckErr) =>
                    chuckErr
                        ? console.error(chuckErr)
                        : console.info('complete')
            );
        }
    }
    ); res.redirect("back"); //refreshing the page
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
}
);

app.listen(PORT, () =>
    console.log(`listening to ${PORT}`)
);