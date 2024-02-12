const express = require('express');
const mongoose = require('mongoose');
const app = express();
const database = require('./database/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDatabase();

const port = 10000;

app.listen(port, () => {
  console.log(`Server initiated at ${port}...`);
});
