// const MongoClient = require('mongodb').MongoClient // Import mongoDB client
const {MongoClient, ObjectID} = require('mongodb') // Importing mongoDB functions

const obj = new ObjectID() // Generating ID to obj

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{ // Establish connection with client
    if(err) { // Check fo errors
        return console.log('Unable to connect to mongoDb Server')
    }
    console.log('Connected to mongoDb server')
    const db = client.db('TodoApp') // Call speciefic database

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c50198377f771ab37e9022d')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(result)
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5c4f4f6b44c4e98424502408')
    }, {
        $set: {
            name: 'Test'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result)=>{
        console.log(result)
    })
    // client.close() // Close connection
})