const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    state: {type: String, enum:["todo","progress", "finish"], required:true},
});

module.exports = mongoose.model('Todo', todoSchema);