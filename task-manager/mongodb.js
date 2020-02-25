// CRUD
const {MongoClient, ObjectID} = require("mongodb")

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology:true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)
    db.collection("tasks").findOne({_id: new ObjectID("5e55561e8c7e68071c835435")}, (error, task) => {
        //console.log(task)
    })

    db.collection("tasks").find({completed: false}).toArray().then((tasks, error) => {
        console.log(tasks)
    })

    // db.collection("users").findOne({ _id: new ObjectID("5e5551a66bd8662414583e31") }, (error, user) => {
    //     if (error) {
    //         return console.log("Unabel to fetch: " + error)
    //     }
    //     console.log(user)
    // })

    // db.collection("users").find({age:46}).toArray((error, documents) => {
    //     console.log(documents)
    // })

    // db.collection("users").find({age:46}).count((error, count) => {
    //     console.log(count)
    // })
    
    // client.close().then(() => {
    //     console.log("Connection closed!")
    // })
})