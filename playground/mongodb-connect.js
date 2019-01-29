// const MongoClient = require('mongodb').MongoClient // Import mongoDB client
const {MongoClient, ObjectID} = require('mongodb') // Importing mongoDB functions

const obj = new ObjectID() // Generating ID to obj

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{ // Establish connection with client
    if(err) { // Check fo errors
        return console.log('Unable to connect to mongoDb Server')
    }
    console.log('Connected to mongoDb server')
    const db = client.db('TodoApp') // Call speciefic database

    db.collection('Todos').insertOne({ // Insert one document to the specific collection

        text: 'Something to do',
        completed: false

    }, (err, result) =>{ // Check for errors or resolts

        if(err) {
            return console.log('Unable to insert todo ', err)
        }

        console.log(JSON.stringify(result.ops, undefined, 2))

    })

    // db.collection('Users').insertOne({
    //     name: 'Gil',
    //     age: 33,
    //     location: 'Haifa'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert user ', err)
    //     }

    //     console.log(result.ops[0]._id.getTimestamp())
    // })

    client.close() // Close connection
})

