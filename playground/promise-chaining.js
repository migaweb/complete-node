require("../task-manager/src/db/mongoose")

const User = require("../task-manager/src/models/user")


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