const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const address = process.argv[2]

if (!address) {
    console.log("Please provide an address.")
} else {
    geocode(address, (error, {latitude, longitude, location} = data) => {
        if (error) {
            return console.log(error)
        } 
        
        forecast(latitude, longitude, (error, {summary, temperature, rainChance} = forecastData) => {
            if (error) {
                return console.log(error)
            }
            console.log(location)
            console.log(summary + " Just nu är det " + temperature + " grader ute. Det är " + (rainChance * 100) + "% chans för regn." )
        })
    })
}