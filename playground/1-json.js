const fs = require("fs")
const fileName = "1-json.json"

function writeJSON(data) {
    const json = JSON.stringify(data)
    fs.writeFileSync(fileName, json)
}

function readJSON() {
    const dataBuffer = fs.readFileSync(fileName)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
}

let user = readJSON()
user.name = "Micke"
user.age = 46
writeJSON(user)
