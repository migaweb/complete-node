const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../../src/models/user")
const Task = require("../../src/models/task")

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "User One",
    email: "user1@test.com",
    age: 12,
    password: "56What!!",
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: "User Two",
    email: "user2@test.com",
    age: 12,
    password: "56What__",
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: "My first task",
    completed: false,
    owner: userOne._Id
}

const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: "My 2 task",
    completed: true,
    owner: userOne._Id
}

const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: "My third task",
    completed: true,
    owner: userTwo._Id
}


const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()

    
    //await new Task(taskOne).save()
    //await new Task(taskTwo).save()
    //await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase
}