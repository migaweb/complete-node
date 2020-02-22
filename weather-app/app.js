const request = require("request")
const baseUrl = "https://api.darksky.net/forecast/e619942912d870b74fac4379bec0e440/37.8267,-122.4233"
let requestUrl = baseUrl + "?"

const addUrlParameter = (url, key, value) => {
    return  url + (!url.endsWith("?") ? "&" : "") + key + "=" + value
}
requestUrl = addUrlParameter(requestUrl, "units", "si")
requestUrl = addUrlParameter(requestUrl, "lang", "sv")

request({ 
    url: requestUrl,
    json: true,
}, (error, response) => {
    console.log(response.body.daily.data[0].summary + " Det är just nu " + response.body.currently.temperature + " grader. Det är " + response.body.currently.precipProbability + "% chans för regn.")
})


