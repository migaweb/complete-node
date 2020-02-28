const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT || 3000

// Cnfigure to parse JSON
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port: ", port)
})

const jwt = require("jsonwebtoken")
const myFunction = async () => {
    const token = jwt.sign({ _id: "1233456" }, "migaweb", { expiresIn: "10 seconds" })

    console.log(token)

    const result = jwt.verify(token, "migaweb")
    console.log("result: ", result)
}

myFunction()
