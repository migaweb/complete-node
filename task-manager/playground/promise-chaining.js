require("../src/db/mongoose")

const User = require("../src/models/user")
//5e5689534ec3ca3ca8991e04

// User.findByIdAndUpdate("5e5689534ec3ca3ca8991e04", { age: 16 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 16 })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount("5e5689534ec3ca3ca8991e04", 9).then((count) => {
    console.log("Count", count)
}).catch((e) => {
    console.log(e)
})