const mongoose = require('mongoose')

mongoose.Promise = global.Promise // Set mongoose to use default promise library
mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true }) // Connect to db with mongoose
mongoose.set('useFindAndModify', false)

module.exports = { mongoose }