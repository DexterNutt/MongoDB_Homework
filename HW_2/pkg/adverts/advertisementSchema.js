const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Advertisement title is required!'],
    trim: true,
    minlength: 2,
    maxlength: [255, 'Title is too long'],
  },
  description: {
    type: String,
    required: [true, 'Describe your product!'],
    minlength: 2,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required!'],
    min: [1, 'Price cannot be lower than 1'],
  },
  contactNumber: {
    type: Number,
    required: [true, 'Must add a contact number!'],
  },
  contactEmail: {
    type: String,
    default: 'no e-mail provided',
  },
});

const Advert = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advert;
