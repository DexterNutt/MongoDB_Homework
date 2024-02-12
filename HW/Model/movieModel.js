const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
  },
  director: {
    type: String,
  },
  year: {
    type: Number,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
