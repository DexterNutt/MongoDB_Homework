const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');

const db = require('./pkg/db/index');
const auth = require('./handlers/authHandler');
const adverts = require('./pkg/adverts/advertController');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.post('/api/v1/signup', auth.signUp);
app.post('/api/v1/login', auth.login);

app.get('/advertisements', adverts.getAllAdverts);
app.get('/advertisement', adverts.getOne);
app.post('/api/v1/advertisements', adverts.createAdvert);
app.delete('/api/v1/advertisements', adverts.deleteAdvert);
app.patch('/api/v1/advertisements', adverts.updateAdvert);

app.listen(process.env.PORT, error => {
  if (error) console.log('Could not initiate server');
  console.log(`Server initiated on port ${process.env.PORT}...`);
});
