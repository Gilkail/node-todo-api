const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('../../models/todo')
const {User} = require('../../models/user')

const userOneId = new ObjectID
const userTwoId = new ObjectID

const users = [{
    _id: userOneId,
    email: 'gil@gmail.com',
    password: 'TestPass1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
},{
    _id: userTwoId,
    email: 'hello@gmail.com',
    password: 'TestPass2',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth' }, 'abc123').toString()
    }]
}]

const todos = [{
    text: 'First Test Todo',
    _id: new ObjectID(),
    _creator: userOneId
},{
    text: 'Second Test Todo',
    _id: new ObjectID(),
    _creator: userTwoId
}]

const populateTodos = (done)=>{
    Todo.deleteMany({}).then(()=> {
        return Todo.insertMany(todos)
    }).then(()=> done())
}

const populateUsers = (done)=>{
    User.deleteMany({}).then(()=>{
        const userOne = new User(users[0]).save()
        const userTwo = new User(users[1]).save()

        return Promise.all([userOne, userTwo])
    }).then(()=> done())
}

module.exports = {populateTodos, todos, populateUsers, users}