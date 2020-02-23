const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
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
    if (!req.query.address) {
        return res.send({
            error: "You must provide a an address."
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecastData.summary = forecastData.summary + " Det är just nu " + forecastData.temperature + " grader ute. Det är " + forecastData.rainChance + "% chans för regn."
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help article not found",
        name: "Micke",
        errorMessage: "The help article you are looking for could not be found."
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page not found",
        name: "Micke",
        errorMessage: "The page you are looking for could not be found."
    })
})

app.listen(3000, () => {
    console.log("Servers is up on port 3000.")
});