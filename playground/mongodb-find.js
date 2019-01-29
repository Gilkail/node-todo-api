// const MongoClient = require('mongodb').MongoClient // Import mongoDB client
const {MongoClient, ObjectID} = require('mongodb') // Importing mongoDB functions

const obj = new ObjectID() // Generating ID to obj

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{ // Establish connection with client
    if(err) { // Check fo errors
        return console.log('Unable to connect to mongoDb Server')
    }
    console.log('Connected to mongoDb server')
    const db = client.db('TodoApp') // Call speciefic database

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c4f1106c13f809ba822d6b7')
    // }).toArray().then((docs)=>{
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err)
    // })

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos Count: ${count}`)
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err)
    // })

    db.collection('Users').find({
        name: 'Gil'
    }).toArray().then((docs)=>{
        console.log('Users')
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err)=>{
        console.log('Unable to fetch todos', err)
    })

    // client.close() // Close connection
})