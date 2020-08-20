const express = require("express");
const router = express.Router();
const localStrategy = require('passport-local').Strategy,


/* function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user)
      next();
    else
      res.redirect('/login');
  });
} */



/* app.get('/login', (req, res) => {
  res.send('Login page. Please, authorize.');
}); */

/* app.use((req, res, next) => {
  console.log(111, req.user, req);
  if (req.user)
    next();
  else
    res.redirect('/login');
}); */

/* app.router('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));
 */
/* app.get('/home', checkAuth(), (req, res) => { todo сделать 
  res.send('Home page. You\'re authorized.');
}); */
