const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../config.env` });

const databaseURL = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

exports.init = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log('Connected to Database!');
  } catch (error) {
    console.log(error.message);
  }
};
