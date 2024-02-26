//! TWITTER APP USERS TO CREATE POSTS
//! NEWS-FEED ROUTE TO PRESENT ALL TWEETS
//! HOME ROUTE TO SHOW ONLY TWEETS FROM THE USER

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const morgan = require('morgan');

const db = require('./pkg/db/index');

const auth = require('./handlers/authHandler');
const post = require('./handlers/postHandler');
const viewHandler = require('./handlers/viewHandler');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

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
      path: ['/signup', '/login'],
    })
);

app.post('/signup', auth.signUp);
app.post('/login', auth.login);

app.get('/post', post.getAll);
app.get('/post/:id', post.getOne);
app.post('/post', post.create);
app.patch('/post/:id', post.update);
app.delete('/post/:id', post.delete);

app.post('/me', post.createByUser);
app.get('/me', post.getByUser);

app.get('/login', viewHandler.getLoginForm);
app.get('/viewPosts', viewHandler.postView);

app.listen(process.env.PORT, error => {
  if (error) console.log('Could not initiate server');
  console.log(`Server initiated on port ${process.env.PORT}...`);
});
