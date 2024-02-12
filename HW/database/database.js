const mongoose = require('mongoose');

exports.connectToDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dexternutt:IQmZkcUJTJMZ56Cm@cluster0.phtr5jb.mongodb.net/MongoDB_Homework?retryWrites=true&w=majority'
    );
    console.log('Database created!');
  } catch (err) {
    console.log(err);
  }
};
