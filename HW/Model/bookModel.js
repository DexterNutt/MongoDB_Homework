const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
  },
  author: {
    type: String,
    required: [true, 'Book Author is required'],
  },
  date: {
    type: Number,
    // default: 0,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
