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

app.use(
  jwt
    .expressjwt({
      algorithms: ['HS256'],
      secret: process.env.JWT_SECRET,
      getToken: req => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
          return req.headers.authorization.split(' ')[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ['/api/v1/signup', '/api/v1/login'],
    })
);

app.post('/api/v1/signup', auth.signUp);
app.post('/api/v1/login', auth.login);

app.get('/advertisements', adverts.getAllAdverts);
app.get('/advertisement/:id', adverts.getAdvert);
app.post('/api/v1/advertisements', adverts.createAdvert);
app.delete('/api/v1/advertisements/:id', adverts.deleteAdvert);
app.patch('/api/v1/advertisements/:id', adverts.updateAdvert);

app.listen(process.env.PORT, error => {
  if (error) console.log('Could not initiate server');
  console.log(`Server initiated on port ${process.env.PORT}...`);
});
