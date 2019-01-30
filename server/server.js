const express = require('express')
const bodyParser = require('body-parser')

const {ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json()) // Add json parser grabbed from body-parser package to the app usage

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc)
    }, (e)=>{
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    }, (e)=>{
        res.status(400).send(e)
    })
})

app.get('/todos/:id',(req, res)=>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        return res.sendStatus(400)
    }
    
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.sendStatus(404)    
        }
        res.send({todo})
    }, (e)=>{
        res.status(400).send()
    })
})

app.listen(port, ()=>{
    console.log(`Started on port ${port}`)
})

module.exports = {app}