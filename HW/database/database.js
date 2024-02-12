const mongoose = require('mongoose');
// const db = 'MongoDB_Homework';

exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://dexternutt:IQmZkcUJTJMZ56Cm@cluster0.phtr5jb.mongodb.net/MongoDB_Homework?retryWrites=true&w=majority`
    );
    console.log('Connected to database!');
  } catch (err) {
    console.log(err);
  }
};
