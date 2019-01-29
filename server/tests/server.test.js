const expect = require('expect')
const request = require('supertest')

const {app} = require('../server')
const {Todo} = require('../models/todo')

// Remove all todos before each test case
beforeEach((done)=>{
    Todo.deleteMany({}).then(()=> done() )
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
                
                Todo.find().then((todos)=>{ // If no errors check the todos collection by check the Todo model on the DB and return the todos list
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
                    expect(todos.length).toBe(0)
                    done()
                }).catch((e) => done(e))
            })
    })
})