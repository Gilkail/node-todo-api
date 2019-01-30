const mongoose = require('mongoose')

mongoose.Promise = global.Promise // Set mongoose to use default promise library
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }) // Connect to db with mongoose

module.exports = { mongoose }