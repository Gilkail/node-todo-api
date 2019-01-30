const {ObjectID} = require('mongodb')
const {mongoose} = require('../server/db/mongoose')
const {Todo} = require('../server/models/todo')
const {User} = require('../server/models/user')

// const id = '5c509bb24ecf43348c502c81'

// if(!ObjectID.isValid(id)){
//     return console.log('Id not valid')
// }

// Query many docments by model name -> returns as array
Todo.find({_id: id}).then((todos)=>{
    if(todos.length === 0){
        return console.log('Id not found')
    }
    console.log('Todos :', todos)
})

// Query only one document -> returns as object
Todo.findOne({_id: id}).then((todo)=>{
    if(!todo){
        return console.log('Id not found')
    }
    console.log('Todo: ', todo)
})

// Searching document by ID -> returns as oject
Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found')
    }
    console.log('Todo by ID: ', todo)
}).catch((e)=>{
    console.log(e)
})

const userId = '5c504f8ef321228ed092ff6b'

User.findById(userId).then((user)=>{
    
    if(!user){
        return console.log('User not found')
    }

    console.log('User: ', user)

}, (e)=>{
    console.log(e)
})