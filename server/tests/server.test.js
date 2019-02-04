const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')
const {app} = require('../server')
const {Todo} = require('../models/todo')
const {User} = require('../models/user')
const {populateTodos, todos, populateUsers, users} = require('./seed/seed')

beforeEach(populateUsers)
// Remove all todos before each test case
beforeEach(populateTodos)


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


describe('PATCH /todos/:id route', ()=>{

    it('Should get todo doc', (done)=>{
        const hexID = todos[0]._id.toHexString()
        const docUpdate = {
            text: 'Update',
            completed: true
        }

        request(app)
            .patch(`/todos/${hexID}`)
            .send(docUpdate)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(docUpdate.text)
                expect(res.body.todo.completed).toBe(docUpdate.completed)
                expect(res.body.todo.completedAt).toBeA('number')
            })
            .end((err, res)=>{
                if(err) {
                    return done(err)
                }

                Todo.findById(hexID).then((todo)=>{
                    expect(todo.text).toEqual(docUpdate.text)
                    expect(todo.completed).toEqual(docUpdate.completed)
                    done()
                }).catch((e) => done(e))
            })
    })

    it('Should return 400 if todo not found', (done)=>{
        const id = new ObjectID().toHexString()

        request(app)
            .patch(`/todos/${id}`)
            .expect(404)
            .end(done)
    })

    it('Should return 400 if id invalid', (done)=>{
        request(app)
            .patch(`/todos/123`)
            .expect(400)
            .end(done)
    })
})

describe('GET /users/me', ()=>{
    it('sould return user if authenticated', (done)=>{
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done)
    })

    it('sould return 401 if not authenticated', (done)=>{
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res)=>{
                expect(res.body).toEqual({})
            })
            .end(done)
    })
})

describe('POST /users', ()=>{

    it('Should create a user', (done)=>{
        const email = 'gil@test.com'
        const password = 'DASdasfgas8'
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toExist()
                expect(res.body._id).toExist()
                expect(res.body.email).toBe(email)
            })
            .end((err)=>{
                if(!err){
                    return done()
                }
                
                User.findOne({email}).then((user)=>{
                    expect(user.email).toExist()
                    expect(user.password).toNotBe(password)
                })
            })
    })

    it('Should return validation errors if request invalid', (done)=>{
        const email = 'gil@test'
        const password = 'DASdasfgas8'
        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    })

    it('Should create user if email in use', (done)=>{
        const email = users[0].email
        const password = 'DASdasfgas8asd'
        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done) 
    })
})

describe('POST /users/login', ()=>{
    it('Should login a user', (done)=>{
        const email = users[1].email
        const password = users[1].password
        request(app)
            .post('/users/login')
            .send({email, password})
            .expect(200)
            .expect((res)=>{
                expect(res.headers['x-auth']).toExist()
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    })
                    done()
                }).catch((err)=> done(err))
            })
    })

    it('Should reject a login', (done)=>{
        request(app)
            .post('/users/login')
            .send({email: users[1].email, password: '111111'})
            .expect(401)
            .expect((res)=>{
                expect(res.headers['x-auth']).toNotExist()
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[0]).toNotExist()
                    done()
                }).catch((err)=> done(err))
            })
    })
})