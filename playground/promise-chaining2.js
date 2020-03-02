require("../task-manager/src/db/mongoose")

const Task = require("../task-manager/src/models/task")

// Task.findByIdAndDelete("5e57ffe43c09a840b44e7235").then((result) => {
//     console.log(result)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log("Completed tasks: ", count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})

    return count
}

deleteTaskAndCount("5e5814cfa2b5ac2fbc0e0c4f").then((count) => {
    console.log("Count: ", count)
}).catch((e) => {
    console.log(e)
})
