const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');

const db = require('./pkg/db/index');
const auth = require('./handlers/authHandler');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.init();

app.listen(process.env.PORT, error => {
  if (error) console.log('Could not initiate server');
  console.log(`Server initiated on port ${process.env.PORT}...`);
});
