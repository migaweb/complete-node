const path = require("path")
const express = require("express")

const publicDirectoryPath = path.join(__dirname, "../public")
const app = express();
app.use(express.static(publicDirectoryPath))

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