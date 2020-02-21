const fs = require("fs")
const chalk = require("chalk")

const fileName = "notes.json"

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) { // === undefined
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green("New note added"))
    } else {
        console.log(chalk.red("Note title taken"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const noteRemoved = false;
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
    }

    return (notes.length !== notesToKeep.length) 
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold(chalk.blueBright("Your notes: ")))
    
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.blueBright("Your note: "))
        console.log(chalk.bold(note.title))
        console.log(note.body)
    }
    else {
        console.log(chalk.red("Note not found!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync(fileName, dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(fileName)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}