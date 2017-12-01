// app/models/book.js

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    genre: String,
    author: String,
    read: Boolean
});

module.exports = mongoose.model('Book', BookSchema);