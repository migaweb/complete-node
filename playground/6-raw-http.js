const https = require("https")

const url = "https://api.darksky.net/forecast/apikey/37.8267,-122.4233"

const request = https.request(url, (response) => {
    let data = ""
    response.on("data", (chunk) => {
        data += chunk.toString()
    })

    response.on("end", () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on("error", (error) => {
    console.log(error)
})

request.end()