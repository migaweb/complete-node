setTimeout(() => {
    console.log("The seconds are gone.")
}, 2000)

const names = ["Mike", "Jen", "Jess"]
const shortNames = names.filter((name) => {
    return name.length <= 3
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 12
        }
        callback(data);
    }, 2000)
}

geocode("Malmö", (data) => {
    console.log(data)
})

