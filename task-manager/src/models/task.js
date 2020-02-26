const validator = require("validator")
const mongoose = require("mongoose")

const Task = mongoose.model("Task", {
    description: {
        type: String,
        validate(value) {

        }
    },
    completed: {
        type: Boolean,
        default: false
    }
})