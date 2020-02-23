const request = require("request")
const addParameter = require("./urlHelper")
const apikeyconfig = require("./apikeyconfig")

const forecast = (lat, long, callback) => {
    const apikey = apikeyconfig().wapikey
    let url = "https://api.darksky.net/forecast/" + apikey + "/" + lat + "," + long + "?"
    url = addParameter(url, "units", "si")
    url = addParameter(url, "lang", "sv")

    request({ 
        url,
        json: true,
    }, (error, {body} = response) => {
        if (error) {
            callback("Unable to connect to weather service! Check network connection.", undefined)
        }
        else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary, 
                temperature: body.currently.temperature, 
                rainChance: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast