const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { readFileSync } = require('fs');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(err, user);
});

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    (userLogin, password, done) => {
      const users = JSON.parse(readFileSync("Auth/users.json", "utf-8"));
      const user = users.find(({ login }) => login === userLogin);

      if (user) {
        if (bcrypt.compareSync(password, user.pass)) {
          console.log("\x1b[32m", "login:", "WELL DONE", "\x1b[37m");
          return done(null, user);
        } else {
          console.error("login", "Неверный пароль");
          return done(null, false, { message: "Неверный пароль" });
        }
      } else {
        console.error("login", "Не найдено пользователя с таким логином");
        return done(null, false, { message: "Не найдено пользователя с таким логином" });
      }
    }
  )
);

module.exports = passport;
