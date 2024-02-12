const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const database = require('./database/database');
const movieController = require('./Controller/movieController');
const actorController = require('./Controller/actorController');
const bookController = require('./Controller/bookController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://dexternutt:IQmZkcUJTJMZ56Cm@cluster0.phtr5jb.mongodb.net/MongoDB_Homework?retryWrites=true&w=majority`
    );
    console.log('Connected to database!');
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();

app.get('/api/v1/movies', movieController.getMovies);
app.post('/api/v1/movies', movieController.addNewMovie);
app.get('/api/v1/actors', actorController.getActors);
app.post('/api/v1/actors', actorController.addNewActor);
app.get('/api/v1/books', bookController.getBooks);
app.post('/api/v1/books', bookController.addNewBook);

const port = 10000;

app.listen(port, () => {
  console.log(`Server initiated at ${port}...`);
});
