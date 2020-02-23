const path = require("path")
const express = require("express")

const publicDirectoryPath = path.join(__dirname, "../public")
const app = express();
app.set("view engine", "hbs")
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Micke"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Micke"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Micke",
        helpText: "Welcome to the help pages"
    })
})

app.get("/weather", (req, res) => {
    res.send({
        location: "Malmö",
        forecast: {
            summary: "It is cloudy",
            temperature: 9
        }
    })
})

app.listen(3000, () => {
    console.log("Servers is up on port 3000.")
});