const request = require("request")
const addParameter = require("./urlHelper")
const apikeyconfig = require("./apikeyconfig")

const geocode = (address, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?"
    const geoServiceToken = apikeyconfig().geokey

    url = addParameter(url, "access_token", geoServiceToken)
    url = addParameter(url, "limit", "1")
    url = addParameter(url, "language", "sv")

    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback("Unable to connect to geo coding. Check network connection.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location! Try again with different search term.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode