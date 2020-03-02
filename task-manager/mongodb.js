// CRUD
const {MongoClient, ObjectID} = require("mongodb")

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology:true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)
    //ObjectId("5e55561e8c7e68071c835433")
    db.collection("tasks").deleteOne({ _id: new ObjectID("5e55561e8c7e68071c835433") })
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        client.close()
    })
    // db.collection("tasks").updateMany({completed: false},
    // {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // }).finally(() => {
    //     client.close()
    // })
})