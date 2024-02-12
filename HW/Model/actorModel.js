const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Actor name is required'],
  },
  surname: {
    type: String,
    required: [true, 'Actor surname is required'],
  },
  oscars: {
    type: Number,
    // default: 0,
  },
});

const Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
