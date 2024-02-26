const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: [true, 'User already exists!'],
  },
  email: {
    type: String,
    required: [true, 'E-mail is required!'],
    lowercase: true,
    unique: [true, 'User already exists!'],
    validate: [validator.isEmail, 'Please provide a valid e-mail!'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    minlength: [4, 'Password must be at least 4 characters long!'],
    // validate: [validator.isStrongPassword, 'Please provide a strong password!']
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
