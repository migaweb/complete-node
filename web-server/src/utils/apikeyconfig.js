const fs = require("fs")
const path = require("path")

const apikeyconfig = () => {
    const filePath = path.join(__dirname, '../..', 'w-app.conf');;
    return JSON.parse(fs.readFileSync(filePath).toString())    
}

module.exports = apikeyconfig