//! TWITTER APP USERS TO CREATE POSTS
//! NEWS-FEED ROUTE TO PRESENT ALL TWEETS
//! HOME ROUTE TO SHOW ONLY TWEETS FROM THE USER

// MODULI (EXTERNI)
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// MODULI (NASHI)
const db = require('./pkg/db/index');
const auth = require('./handlers/authHandler');
const post = require('./handlers/postHandler');

const app = express();

app.use('view engine', 'ejs');
app.use('public');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

db.init();

app.post('/signup', auth.signUp);
app.post('/login', auth.login);

app.use(
  jwt
    .expressjwt({
      algorithms: ['HS256'],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
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
      path: ['/signup', '/login'],
    })
);

app.get('/post', post.getAll);
app.get('/post/:id', post.getOne);
app.post('/post', post.create);
app.patch('/post/:id', post.update);
app.delete('/post/:id', post.delete);

app.post('/me', post.createByUser);
app.get('/me', post.getByUser);

// View Routes
app.get('/viewPosts');

app.listen(process.env.PORT, (error) => {
  if (error) console.log('Could not initiate server');
  console.log(`Server initiated on port ${process.env.PORT}...`);
});

//* STATUS CODES
//? 1xx Informative and not used
//? 100 - continue
//? 101 - switch protocols

//? 2xx Success responses
//? 200 - OK
//? 201 - created
//? 204 - no content

//? 3xx Moving
//? 301 - Moved permanently
//? 302 - Found
//? 304 - Not modified

//? 4xx - Client errors
//? 400 - Bad request
//? 401 - Unauthorized
//? 403 - Forbidden
//? 404 - Not found
//? 429 - Too many requests

//? 5xx - Server errors
//? 500 - Internal server error
//? 501 - Not implemented
//? 503 - Server Unavailable
