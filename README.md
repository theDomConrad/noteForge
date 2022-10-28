# Note Taker!

## Description

Here we have a wonderful, wonderful note taking app. [Here is a link to the application](https://noteforge.herokuapp.com/)
A user may open the app and take notes! 

## How to use

Press the save button on the top right after entering a title and text, their note will be saved on the left. One may even delete their note by pressing the red delete button! It is a very clean, easy to use app deployed through heroku. 

## Screenshot of app

![screenshot](https://media.discordapp.net/attachments/408481106040717322/1035354334122225724/unknown.png)

## the Code!
Here we are showcasing the function that helps our index.js delete the desired note. We use a basic for loop and the splice() method to achieve desired results - after we have retrieved the data using fs.readfile. 


```
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
```

## Author Links
[Linkedin](https://www.linkedin.com/in/dominic-conradson-76638b172/)---
[GitHub](https://github.com/theDomConrad/)---
[Portfolio](https://thedomconrad.github.io/Dominic-Conradson-Portfolio/)---
