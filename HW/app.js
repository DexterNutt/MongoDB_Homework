const express = require('express');
const mongoose = require('mongoose');
const app = express();
const database = require('./database/database');
const movieController = require('./Controller/movieController');
const actorController = require('./Controller/actorController');
const bookController = require('./Controller/bookController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.connectToDatabase();

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
