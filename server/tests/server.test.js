const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')
const {app} = require('../server')
const {Todo} = require('../models/todo')

const todos = [{
    text: 'First Test Todo',
    _id: new ObjectID()
},{
    text: 'Second Test Todo',
    _id: new ObjectID()
}]

// Remove all todos before each test case
beforeEach((done)=>{
    Todo.deleteMany({}).then(()=> {
        return Todo.insertMany(todos)
    }).then(()=> done())
})


// Create POST todos test case
describe('POST /todos', ()=>{
    it('Should create a new todo', (done)=>{
        const text = 'Test to do text' // Set todo demo data

        request(app) // Request app by super test
            .post('/todos') // Post to app /todos
            .send({text}) // Send the text value
            .expect(200) // Expect status 200            
            .expect((res)=>{ // Expect custom reponse
                expect(res.body.text).toBe(text) // Response should be equal the text value
            })
            .end((err, res)=>{
                if(err){ // Check for error in the end of test case
                    return done(err)
                }
                
                Todo.find({text}).then((todos)=>{ // If no errors check the todos collection by check the Todo model on the DB and return the todos list
                    expect(todos.length).toBe(1) // Check if one todo in the DB
                    expect(todos[0].text).toBe(text) // Check if the first document text equal text
                    done() /// End operation
                }).catch((e)=> done(e))
            })
    })

    it('Should not create todo with invalid body data', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res)=>{
                if(err) {
                    return done(err)
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })
    })
})

describe('GET /todos route', ()=>{
    it('Should get all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})

describe('GET /todos/:id route', ()=>{
    it('Should get todo doc', (done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('Should return 400 if todo not found', (done)=>{
        const id = new ObjectID().toHexString()
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

    it('Should return 404 if id invalid', (done)=>{
        request(app)
            .get(`/todos/123`)
            .expect(400)
            .end(done)
    })
})

describe('DELETE /todos/:id route', ()=>{
    it('Should get todo doc', (done)=>{
        const hexID = todos[0]._id.toHexString()
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end((err, res)=>{
                if(err) {
                    return done(err)
                }

                Todo.findById(hexID).then((todo)=>{
                    expect(todo).toNotExist()
                    done()
                }).catch((e) => done(e))
            })
    })

    it('Should return 400 if todo not found', (done)=>{
        const id = new ObjectID().toHexString()
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

    it('Should return 404 if id invalid', (done)=>{
        request(app)
            .delete(`/todos/123`)
            .expect(400)
            .end(done)
    })
})