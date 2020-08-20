const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const { readFileSync } = require('fs');

passport.use(new LocalStrategy(
  {
    usernameField: "login",
    passwordField: "password"
  },
  (userLogin, password, done) => {
    const users = JSON.parse(readFileSync("Auth/users.json", "utf-8"));
    const user = users.find(({ login }) => login === userLogin);

    if (user) {
      if (bcrypt.compareSync(password, user.pass)) {
        return done(null, {
          id: parseInt(Math.random() * 1000), // убрать и добавить при реге
          ...user
        });
      } else {
        return done(null, false, { message: "Неверный пароль" });
      }
    } else {
      return done(null, false, { message: "Не найдено пользователя с таким логином" });
    }
  }
));

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    console.log("login", user);
  })(req, res, next);
});

/* router.post("/login", (req, res, next) => {
  

  const users = JSON.parse(readFileSync("Auth/users.json", "utf-8"));

  if (!users.length) { todo убрать
    res.status(404);
    res.send("Не найдено пользователя с таким логином");
  }

  let wasFound = false;

  users.forEach(({ name, login, pass }) => {
    console.log(111, login, req.body.login);
    if (login === req.body.login) {
      wasFound = true;
      if (bcrypt.compareSync(req.body.password.toString(), pass)) {
        res.status(200);
        res.send(name);
      } else {
        res.status(400);
        res.send("Неверный пароль");
      }
    }
  })

  if (!wasFound) {
    res.status(404);
    res.send("Не найдено пользователя с таким логином");
  }

}); */

module.exports = router;