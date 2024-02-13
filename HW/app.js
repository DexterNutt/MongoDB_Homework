const express = require('express');
const mongoose = require('mongoose');
const app = express();
const database = require('./database/database');
const movieController = require('./Controller/movieController');
const actorController = require('./Controller/actorController');
const bookController = require('./Controller/bookController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

database.connectToDatabase();

//*Actors Route
app.get('/api/v1/actors', actorController.getActors);
app.post('/api/v1/actors', actorController.addNewActor);
app.get('/actors', actorController.renderActors);
app.get('/actors/:id', actorController.renderActor);

//*Movies Route
app.get('/api/v1/movies', movieController.getMovies);
app.post('/api/v1/movies', movieController.addNewMovie);

//*Books route
app.get('/api/v1/books', bookController.getBooks);
app.post('/api/v1/books', bookController.addNewBook);

const port = 10000;

app.listen(port, () => {
  console.log(`Server initiated at ${port}...`);
});
