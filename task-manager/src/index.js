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