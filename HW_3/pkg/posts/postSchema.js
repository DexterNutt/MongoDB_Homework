const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: 1,
    maxlength: [50, 'Title is too long'],
  },
  post: {
    type: String,
    required: [true, 'Must post something!'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
    default: 'default.jpg',
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
