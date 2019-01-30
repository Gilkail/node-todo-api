const {ObjectID} = require('mongodb')
const {mongoose} = require('../server/db/mongoose')
const {Todo} = require('../server/models/todo')
const {User} = require('../server/models/user')

// Todo.delete({}).then((result)=>{
//     console.log(result)
// })

// Todo.findOneAndDelete({})

Todo.findByIdAndDelete('5c517ffe77f771ab37e92c0c').then((todo)=>{
    console.log(todo)
})