const env = process.env.NODE_ENV || 'development' // Check if NODE_ENV already set if not set to development
console.log('env:', env)

if(env === 'development') { //If development set port to 3000 and db to development db
    process.env.PORT = 3000 
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test'){ // If test set port to 3000 and db to test db
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}