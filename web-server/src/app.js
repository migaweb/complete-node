const express = require("express")
const app = express();

app.get("", (req, res) => {
    res.send("Hello express!")
})
app.get("/help", (req, res) => {
    res.send("Help page")
})
app.get("/about", (req, res) => {
    res.send("About")
})
app.get("/weather", (req, res) => {
    res.send("<h1>Weather</h1>")
})

app.listen(3000, () => {
    console.log("Servers is up on port 3000.")
});