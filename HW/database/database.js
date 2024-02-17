const mongoose = require('mongoose');
const db = 'MongoDB_Homework';

exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(`ulr goes here`);
    console.log('Connected to database!');
  } catch (err) {
    console.log(err);
  }
};
