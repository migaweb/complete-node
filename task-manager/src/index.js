const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT || 3000
//const isMaintenance = false

// Middleware function
// app.use((req, res, next) => {
//     if (req.method === "GET") {
//         res.send("Get requests are disbled.")
//     } else {
//         next()
//     }
// })

// Middleware maintenance mode.
// app.use((req, res, next) => {
//     if (isMaintenance) {
//         res.status(503).send("The API is currently under maintenance.")
//     }

//     next()
// })

// Configure to parse JSON
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port: ", port)
})

const User = require("./models/user")
const Task = require("./models/task")
const main = async () => {
    // const task = await Task.findById("5e5a723ad2e7ec10d8f26118")
    // await task.populate("owner").execPopulate()
    // console.log(task.owner)
    
    const user = await User.findById("5e5a714315514d02208e31d0")
    await user.populate("tasks").execPopulate()
    console.log(user.tasks)
}

main()