// const MongoClient = require('mongodb').MongoClient // Import mongoDB client
const {MongoClient, ObjectID} = require('mongodb') // Importing mongoDB functions

const obj = new ObjectID() // Generating ID to obj

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{ // Establish connection with client
    if(err) { // Check fo errors
        return console.log('Unable to connect to mongoDb Server')
    }
    console.log('Connected to mongoDb server')
    const db = client.db('TodoApp') // Call speciefic database

    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then((result)=>{
    //     console.log(result)
    // }, (err)=>{
    //     console.log('Unable to delete todos', err)
    // })

    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then((result)=>{
    //     console.log(result)
    // }, (err)=>{
    //     console.log('Unable to delete todos', err)
    // })

    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result)=>{
    //     console.log(result)
    // }, (err)=>{
    //     console.log('Unable to delete todos', err)
    // })

    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5c4f4f9260c21f9b085e1cbf')
    // }).then((result)=>{
    //     console.log(result)
    // }, (err)=>{
    //     console.log('Unable to delete todos', err)
    // })

    db.collection('Users').deleteMany({
        name: 'Gil'
    }).then((result)=>{
        console.log(result)
    }, (err)=>{
        console.log('Unable to delete todos', err)
    })
    // client.close() // Close connection
})