const validator = require("validator")
const chalk = require("chalk")
const yargs = require("yargs")
const notes = require("./notes")
// Custmize yargs, add, remove, read, list
yargs.version("1.1.0")

// Create add command
yargs.command({
    command: "add",
    describe: "Add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note text",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {notes.addNote(argv.title, argv.body)}
})

// Create remove command
yargs.command({
    command: "remove",
    describe: "Remove anote",
    builder: {
        title: {
            describe: "Note title to remove",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        if (notes.removeNote(argv.title)) {
            console.log(chalk.green("Note removed!"))
        }
        else {
            console.log(chalk.red("No note found!"))
        } 
    }
})

// Create list command
yargs.command({
    command: "list",
    describe: "Listing all the notes",
    handler() { 
        notes.listNotes() 
    }
})

// Create read command
yargs.command({
    command: "read",
    describe: "Reads a note",
    builder: {
        title: {
            describe: "Note title to read",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
     }
})

yargs.parse()
