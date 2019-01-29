const mongoose = require('mongoose')

// Creating model for data structure
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, // Make required
        minlength: 1, // Minimum length
        trim: true // Remove spaces
    },
    completed: {
        type: Boolean,
        default: false // Set default value
    },
    completedAt: {
        type: Number,
        default: null // Set default value
    }
})

module.exports = { Todo }